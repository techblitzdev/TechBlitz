'use server';
import { prisma } from '@/utils/prisma';
import { openai } from '@/lib/open-ai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateDataForAi } from './get-question-data-for-gen';
import { aiQuestionSchema } from '@/lib/zod/schemas/ai/response';
import { addUidsToResponse } from './utils/add-uids-to-response';
import { addOrderToResponseQuestions } from './utils/add-order-to-response-questions';
import { fetchRoadmapQuestions } from '../questions/fetch-roadmap-questiosn';

export const roadmapGenerate = async (opts: {
  roadmapUid: string;
  userUid: string;
}) => {
  // Retrieve and format the necessary data for AI
  const formattedData = await generateDataForAi(opts);

  if (formattedData === 'generated') {
    return fetchRoadmapQuestions(opts);
  }

  // Request AI-generated questions
  const firstPass = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content: `You're an expert software developer teacher. Given a series of user-answered questions with results, generate a roadmap to enhance the user’s knowledge. Focus on areas the user got wrong, AND build on prior questions, guide their next steps. Each question MUST have 4 answers, 1 correct. There MUST be 10 questions`,
      },
      {
        role: 'system',
        content: `The code snippet MUST to be wrapped in a pre tag and a code tag and be put in the 'codeSnippet' field. The title MUST NOT contain any code that relates to the code snippet. The code snippet MUST NOT contain the answer. The title MUST be a question. Answers NEEDS related to the question title. CodeSnippet MUST relate to question title. Answers MUST be related to the code snippet. Hint MUST be related to the codeSnippet. Difficulty MUST be related to the code snippet. Questions MUST be unique. The answers MUST be unique. HARD questions MUST have a longer code snippet`,
      },
      {
        role: 'system',
        content:
          'Topics to focus on: JavaScript, Promises, Async/Await, Array Methods, Objects, scope, closures, fetch, callbacks, recursion, maps, sets,  & other topics you think are relevant. Make sure to include a variety of question types. Make sure to include a variety of code snippets. MAKE the questions challenging. MAKE the questions be real-world applicable.',
      },
      {
        role: 'user',
        content: JSON.stringify(formattedData),
      },
    ],
    response_format: zodResponseFormat(aiQuestionSchema, 'event'),
    temperature: 0,
  });

  if (!firstPass.choices[0]?.message?.content) {
    throw new Error('AI response is missing content');
  }

  // second pass to ensure that the codesnippets do not contain the answer
  const secondPass = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'assistant',
        content:
          'Please ensure that the code snippets do not contain the answer. If they do, please remove the answer from the code snippet. Do not modify the question, answers, hints or codeSnippet fields if not required..',
      },
      {
        role: 'assistant',
        content: firstPass.choices[0].message.content,
      },
    ],
    response_format: zodResponseFormat(aiQuestionSchema, 'event'),
    temperature: 0,
  });

  if (!secondPass.choices[0]?.message?.content) {
    throw new Error('AI response is missing content');
  }

  // Parse and process the AI response
  const formattedResponse = JSON.parse(secondPass.choices[0].message.content);
  const questions = addUidsToResponse(formattedResponse.questionData);

  // add a order value to each question
  const questionsWithOrder = addOrderToResponseQuestions(questions);

  // Prepare database operations in a transaction
  const roadmapQuestionsData = questionsWithOrder.map((question: any) => ({
    uid: question.uid,
    roadmapUid: opts.roadmapUid,
    question: question.questions,
    correctAnswerUid: question.correctAnswerUid,
    codeSnippet: question.codeSnippet,
    hint: question.hint,
    completed: false,
    order: question.order,
    difficulty: question.difficulty.toUpperCase() || 'EASY',
    RoadmapUserQuestionsAnswers: {
      create: question.answers.map((answer: any) => ({
        answer: answer.answer,
        correct: answer.correct,
        uid: answer.uid,
      })),
    },
  }));

  try {
    await prisma.$transaction([
      prisma.roadmapUserQuestions.createMany({
        data: roadmapQuestionsData.map(
          ({ RoadmapUserQuestionsAnswers, ...rest }) => rest
        ),
      }),
      ...roadmapQuestionsData.flatMap((question) =>
        question.RoadmapUserQuestionsAnswers.create.map((answer: any) =>
          prisma.roadmapUserQuestionsAnswers.create({
            data: {
              ...answer,
              questionUid: question.uid,
              uid: answer.uid,
            },
          })
        )
      ),
      prisma.userRoadmaps.update({
        where: {
          uid: opts.roadmapUid,
        },
        data: {
          hasGeneratedRoadmap: true,
        },
      }),
    ]);

    return 'generated';
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw new Error('Roadmap generation failed.');
  }
};
