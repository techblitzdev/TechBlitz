'use server';
import { prisma } from '@/utils/prisma';

export const getRandomQuestion = async (opts: {
  currentQuestionId: string;
  userUid: string;
}) => {
  const { currentQuestionId } = opts;

  // Get a question that the user hasn't answered
  const question = await prisma.questions.findFirst({
    where: {
      uid: {
        not: currentQuestionId,
      },
    },
  });

  return question?.uid;
};
