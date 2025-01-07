'use server';
import { prisma } from '@/lib/prisma';

export const getTotalSubmissions = async (opts: { questionUid: string }) => {
  const { questionUid } = opts;

  // get the total submissions for the question
  const totalSubmissions = await prisma.demoAnswers.count({
    where: {
      questionUid,
    },
  });

  return {
    totalSubmissions,
  };
};
