'use server';
import { prisma } from '@/utils/prisma';

export const answerDefaultRoadmapQuestion = async (opts: {
  questionUid: string;
  answerUid: string;
  roadmapUid: string;
  currentQuestionIndex: number;
  userUid: string;
}) => {
  const { questionUid, answerUid, roadmapUid, currentQuestionIndex, userUid } =
    opts;

  const question = await prisma.defaultRoadmapQuestions.findUnique({
    where: { uid: questionUid },
  });

  if (!question) {
    throw new Error('Question not found');
  }

  const correctAnswer = question.correctAnswer === answerUid;

  const { userAnswer } = await prisma.$transaction(async (prisma) => {
    const userAnswer = await prisma.defaultRoadmapQuestionsUsersAnswers.create({
      data: {
        questionUid: questionUid,
        correct: correctAnswer,
        roadmapUid: roadmapUid,
        answer: answerUid,
      },
    });

    // update the user's roadmap progress
    await prisma.userRoadmaps.update({
      where: {
        uid: roadmapUid,
        AND: {
          userUid,
        },
      },
      data: {
        currentQuestionIndex: {
          increment: 1,
        },
      },
    });

    return { userAnswer };
  });

  return { correctAnswer, userAnswer, currentQuestionIndex: question.order };
};
