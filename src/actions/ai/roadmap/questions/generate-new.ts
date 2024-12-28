'use server';
import { getUserFromSession } from '@/actions/user/authed/get-user';
import { openai } from '@/lib/open-ai';
import { singleQuestionSchema } from '@/lib/zod/schemas/ai';
import { prisma } from '@/utils/prisma';
import { getPrompt } from '@/actions/ai/utils/get-prompt';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import { revalidateTag } from 'next/cache';
import { nanoid } from 'nanoid';

export const generateNewRoadmapQuestion = async (opts: {
  questionUid: string;
}) => {
  const { questionUid } = opts;

  // get the current user
  const user = await getUserFromSession();

  // check if the user is authenticated
  if (!user) {
    throw new Error('User not authenticated');
  }

  if (!questionUid) {
    throw new Error('Question uid is required');
  }

  // get the question from the database
  const question = await prisma.roadmapUserQuestions.findUnique({
    where: {
      uid: questionUid,
      AND: {
        roadmap: {
          userUid: user.data.user?.id,
        },
      },
    },
  });

  if (!question) {
    throw new Error('Question not found');
  }

  // get the content from the db
  const prompts = await getPrompt({
    name: [
      'first-pass-new-roadmap-question',
      'second-pass-new-roadmap-question',
    ],
  });

  // check if the prompt is valid
  if (!prompts) {
    throw new Error('Prompt not found');
  }

  // generate a new question
  const firstPass = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content: prompts['first-pass-new-roadmap-question'].content,
      },
      {
        role: 'user',
        content: question.question,
      },
    ],
    response_format: zodResponseFormat(singleQuestionSchema, 'event'),
    temperature: 0,
  });

  if (!firstPass.choices[0]?.message?.content) {
    throw new Error('AI response is missing content');
  }

  // do a second pass to ensure the question is relevant
  const secondPass = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'assistant',
        content: prompts['second-pass-new-roadmap-question'].content,
      },
      {
        role: 'assistant',
        content: firstPass.choices[0].message.content,
      },
    ],
    response_format: zodResponseFormat(singleQuestionSchema, 'event'),
    temperature: 0,
  });

  if (!secondPass.choices[0]?.message?.content) {
    throw new Error('AI response is missing content');
  }

  const formattedData = JSON.parse(secondPass.choices[0].message.content);

  // add a unique id to each answer
  const answers = formattedData.answers.map((answer: any) => ({
    ...answer,
    uid: nanoid(),
  }));

  // find the correct answer's uid
  const correctAnswer = answers.find((answer: any) => answer.correct);

  if (!correctAnswer) {
    throw new Error('No correct answer found for question');
  }

  // Prepare the transaction
  await prisma.$transaction(async (prisma) => {
    // Delete existing answers for the question
    await prisma.roadmapUserQuestionsAnswers.deleteMany({
      where: {
        questionUid,
      },
    });

    // Update the existing question
    const updatedQuestion = await prisma.roadmapUserQuestions.update({
      where: {
        uid: questionUid,
      },
      data: {
        question: formattedData.question,
        correctAnswerUid: correctAnswer.uid,
        codeSnippet: formattedData.codeSnippet || '',
        hint: formattedData.hint || '',
        difficulty: formattedData.difficulty.toUpperCase() || 'EASY',
      },
    });

    // Create new answers
    await prisma.roadmapUserQuestionsAnswers.createMany({
      data: answers.map((answer: any) => ({
        answer: answer.answer,
        correct: answer.correct,
        uid: answer.uid,
        questionUid,
      })),
    });

    return updatedQuestion;
  });

  // revalidate the question cache
  revalidateTag(`roadmap-question-${questionUid}`);
  revalidateTag('roadmap-data');

  // Return the original question UID to maintain consistency
  return { uid: questionUid };
};
