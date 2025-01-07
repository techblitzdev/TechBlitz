'use server';
import { QuestionDifficulty } from '@/types/Questions';
import { prisma } from '@/lib/prisma';

export interface ReturnType {
  question: string;
  correctAnswer: boolean;
  difficulty: QuestionDifficulty;
}

export const generateDataForAi = async (opts: {
  roadmapUid: string;
  userUid: string;
  generateMore?: boolean;
}): Promise<ReturnType[] | 'generated' | 'invalid'> => {
  const { roadmapUid, userUid, generateMore } = opts;

  // If generating more questions, get existing questions to inform AI
  if (generateMore) {
    const existingQuestions = await prisma.roadmapUserQuestions.findMany({
      where: { roadmapUid },
    });

    // Format existing questions for AI context
    return existingQuestions.map((question) => ({
      question: question.question,
      correctAnswer: question.userCorrect ?? false,
      difficulty: question.difficulty,
      previousQuestion: true, // Flag to indicate this is an existing question
    }));
  }

  // check if the user roadmap is complete already
  const roadmapData = await prisma.userRoadmaps.findUnique({
    where: {
      uid: roadmapUid,
      AND: {
        userUid,
        AND: {
          status: 'COMPLETED',
        },
      },
    },
  });

  // if it is complete, the data we give back will be the questions the
  // user has already answered
  if (roadmapData) {
    const questions = await prisma.roadmapUserQuestions.findMany({
      where: {
        roadmapUid,
      },
    });

    const userAnswers = questions.map((question) => ({
      question: question.question,
      correctAnswer: question.userCorrect,
      difficulty: question.difficulty,
    }));

    return userAnswers;
  }

  // get the roadmap and check if the roadmap has already been generated
  // and if the user that is requesting the data is the same user that
  // generated the data
  const roadmap = await prisma.userRoadmaps.findUnique({
    where: {
      uid: roadmapUid,
      AND: {
        userUid,
      },
    },
  });

  if (roadmap?.hasGeneratedRoadmap) {
    return 'generated';
  }

  // we need to get all of the answers that the user has answered
  // for this roadmap
  const roadmapDefaultAnswers =
    await prisma.defaultRoadmapQuestionsUsersAnswers.findMany({
      where: {
        roadmapUid,
      },
    });

  if (roadmapDefaultAnswers.length === 0) {
    return 'invalid';
  }

  // start an array to store the questions that we will be asking
  const userAnswers = [];

  // now go and get the questions the user answered
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, answer] of roadmapDefaultAnswers.entries()) {
    const question = await prisma.defaultRoadmapQuestions.findUnique({
      where: {
        uid: answer.questionUid,
      },
    });

    // push the question along with the user's answer
    if (question) {
      userAnswers.push({
        question: question.aiTitle || '',
        correctAnswer: answer.correct,
        difficulty: question.difficulty,
      });
    }
  }

  return userAnswers;
};
