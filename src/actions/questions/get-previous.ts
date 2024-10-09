'use server';
import { prisma } from '@/utils/prisma';

export const getPreviousQuestions = async (opts: { userUid: string }) => {
  const todayDate = new Date().toISOString();
  // get all of the previously asked questions
  return await prisma.questions.findMany({
    where: {
      questionDate: {
        lt: todayDate,
      },
    },
  });
};
