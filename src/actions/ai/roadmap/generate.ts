'use server';
import { prisma } from '@/lib/prisma';
import { generateDataForAi } from './get-question-data-for-gen';
import { addUidsToResponse } from './utils/add-uids-to-response';
import { addOrderToResponseQuestions } from './utils/add-order-to-response-questions';
import { fetchRoadmapQuestions } from '@/utils/data/roadmap/questions/fetch-roadmap-questions';
import { generateRoadmapResponse } from './utils/generate-roadmap';
import { revalidateTag } from 'next/cache';
import { QuestionDifficulty } from '@/types/Questions';
import { getUser } from '@/actions/user/authed/get-user';
import { uniqueId } from 'lodash';
import { createOrFetchUserRoadmap } from '@/actions/roadmap/create-or-fetch-user-roadmap';

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

interface RoadmapGenerateOpts {
  generateMore?: boolean;
  generationRecordUid: string;
}

export const roadmapGenerate = async (opts: RoadmapGenerateOpts) => {
  const { generationRecordUid, generateMore = false } = opts;

  // First create the progress record
  const generationProgressRecord = await prisma.roadmapGenerationProgress.create({
    data: {
      uid: generationRecordUid,
      status: 'FETCHING_DATA', // init status
    },
  });

  const updateGenerationProgress = async (status: 'FETCHING_DATA' | 'GENERATED' | 'ERROR') => {
    await prisma.roadmapGenerationProgress.update({
      where: { uid: generationRecordUid },
      data: { status },
    });
  };

  try {
    // create a new roadmap
    const roadmap = await createOrFetchUserRoadmap();
    if (!roadmap) {
      await updateGenerationProgress('ERROR');
      throw new Error('Roadmap not found');
    }

    // handle errors
    if ('code' in roadmap) {
      await updateGenerationProgress('ERROR');
      throw new Error(roadmap.error);
    }
    const roadmapUid = roadmap.uid;

    // get the user
    const user = await getUser();
    if (!user || user?.userLevel === 'FREE') {
      throw new Error('User not found');
    }

    // Retrieve and format the necessary data for AI
    const formattedData = await generateDataForAi({
      roadmapUid,
      userUid: user?.uid,
      generateMore,
    });

    let existingQuestions = [];
    if (formattedData === 'generated' || formattedData === 'invalid') {
      existingQuestions = await fetchRoadmapQuestions({
        roadmapUid,
        userUid: user?.uid,
      });

      if (existingQuestions.length === 0) {
        throw new Error('No questions found for the roadmap');
      }

      // update the status to GENERATED
      await updateGenerationProgress('GENERATED');

      return {
        roadmapUid,
        generationProgressRecord,
      };
    }

    // Request AI-generated questions
    const response = await generateRoadmapResponse({
      formattedData,
      user,
      generationProgressRecord,
    });
    if (!response) {
      throw new Error('AI response is missing content');
    }

    const existingCount = await prisma.roadmapUserQuestions.count({
      where: { roadmapUid },
    });

    // Parse and process the AI response
    const formattedResponse = JSON.parse(response);
    const questions = addUidsToResponse(formattedResponse.questionData);

    // add a order value to each question
    const questionsWithOrder = addOrderToResponseQuestions(questions, existingCount || 0);

    const roadmapQuestionsData: RoadmapQuestion[] = questionsWithOrder.map((question: any) => ({
      uid: question.uid,
      roadmapUid,
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

    await prisma.$transaction([
      prisma.roadmapUserQuestions.createMany({
        data: roadmapQuestionsData.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ RoadmapUserQuestionsAnswers: _, ...rest }) => rest
        ),
      }),
      ...roadmapQuestionsData.flatMap((question) =>
        question.RoadmapUserQuestionsAnswers.create.map((answer) =>
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
          uid: roadmapUid,
        },
        data: {
          hasGeneratedRoadmap: true,
          title: formattedResponse.title,
          description: formattedResponse.description,
          status: 'ACTIVE',
        },
      }),
    ]);

    // Update final status before returning
    await updateGenerationProgress('GENERATED');

    revalidateTag('roadmap-data');

    return {
      roadmapUid,
      generationProgressRecord,
    };
  } catch (error) {
    await updateGenerationProgress('ERROR');
    throw error;
  }
};

export const simulateRoadmapGeneration = async ({
  generationRecordUid,
}: {
  generationRecordUid: string;
}) => {
  // create a new RoadmapGenerationProgress record
  const generationProgressRecord = await prisma.roadmapGenerationProgress.create({
    data: {
      uid: generationRecordUid,
      status: 'FETCHING_DATA', // init status
    },
  });

  // wait for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // update the status to GENERATED
  await prisma.roadmapGenerationProgress.update({
    where: { uid: generationProgressRecord.uid },
    data: {
      status: 'FIRST_PASS',
    },
  });

  // wait for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // update the status to GENERATED
  await prisma.roadmapGenerationProgress.update({
    where: { uid: generationProgressRecord.uid },
    data: {
      status: 'SECOND_PASS',
    },
  });

  // wait for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // update the status to GENERATED
  await prisma.roadmapGenerationProgress.update({
    where: { uid: generationProgressRecord.uid },
    data: {
      status: 'GENERATING_QUESTIONS',
    },
  });

  // wait for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // update the status to GENERATED
  await prisma.roadmapGenerationProgress.update({
    where: { uid: generationProgressRecord.uid },
    data: {
      status: 'GENERATED',
    },
  });

  return {
    roadmapUid: uniqueId(),
    generationProgressRecord,
  };
};
