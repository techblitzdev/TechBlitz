'use server';
import { prisma } from '@/utils/prisma';
import { generateDataForAi } from './get-question-data-for-gen';
import { addUidsToResponse } from '../utils/add-uids-to-response';
import { addOrderToResponseQuestions } from '../utils/add-order-to-response-questions';
import { fetchRoadmapQuestions } from '@/actions/roadmap/questions/fetch-roadmap-questions';
import { generateRoadmapResponse } from '../utils/generate-question';
import { revalidateTag } from 'next/cache';
import { QuestionDifficulty } from '@/types/Questions';

export const roadmapGenerate = async (opts: {
  roadmapUid: string;
  userUid: string;
  generateMore?: boolean;
}) => {
  opts.generateMore = opts.generateMore ?? false;

  // Retrieve and format the necessary data for AI
  const formattedData = await generateDataForAi(opts);

  if (formattedData === 'generated' || formattedData === 'invalid') {
    return fetchRoadmapQuestions(opts);
  }

  // Request AI-generated questions
  const response = await generateRoadmapResponse({ formattedData });
  if (!response) {
    throw new Error('AI response is missing content');
  }

  // Parse and process the AI response
  const formattedResponse = JSON.parse(response);
  const questions = addUidsToResponse(formattedResponse.questionData);

  console.log('questions', questions);

  // add a order value to each question
  const questionsWithOrder = addOrderToResponseQuestions(
    questions,
    opts.generateMore ? formattedData.length : 0
  );

  // Prepare database operations in a transaction
  interface RoadmapQuestion {
    uid: string;
    roadmapUid: string;
    question: string;
    correctAnswerUid: string;
    codeSnippet: string;
    hint: string;
    completed: boolean;
    order: number;
    difficulty: QuestionDifficulty;
    RoadmapUserQuestionsAnswers: {
      create: {
        answer: string;
        correct: boolean;
        uid: string;
      }[];
    };
  }

  const roadmapQuestionsData: RoadmapQuestion[] = questionsWithOrder.map(
    (question: any) => ({
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
          uid: answer.uid
        }))
      }
    })
  );

  await prisma.$transaction([
    prisma.roadmapUserQuestions.createMany({
      data: roadmapQuestionsData.map(
        ({ RoadmapUserQuestionsAnswers, ...rest }) => rest
      )
    }),
    ...roadmapQuestionsData.flatMap((question) =>
      question.RoadmapUserQuestionsAnswers.create.map((answer: any) =>
        prisma.roadmapUserQuestionsAnswers.create({
          data: {
            ...answer,
            questionUid: question.uid,
            uid: answer.uid
          }
        })
      )
    ),
    prisma.userRoadmaps.update({
      where: {
        uid: opts.roadmapUid
      },
      data: {
        hasGeneratedRoadmap: true,
        title: formattedResponse.title,
        description: formattedResponse.description,
        status: 'ACTIVE'
      }
    })
  ]);

  revalidateTag('roadmap-data');

  return 'generated';
};
