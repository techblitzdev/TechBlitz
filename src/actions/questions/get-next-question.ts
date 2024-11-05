'use server';
import { prisma } from '@/utils/prisma';

export const getNextQuestion = async (opts: {
  currentQuestionId: string;
  userUid: string;
}) => {
  const { currentQuestionId, userUid } = opts;

  // Get a question that the user hasn't answered
  const question = await prisma.questions.findFirst({
    where: {
      uid: {
        not: currentQuestionId,
      },
      userAnswers: {
        none: {
          userUid: userUid,
        },
      },
    },
  });

  return question?.uid;
};
