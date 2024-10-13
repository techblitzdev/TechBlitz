'use server';
import { prisma } from '@/utils/prisma';

export const getFastestTimes = async (opts: {
  questionUid: string;
  numberOfResults: number;
}) => {
  const { questionUid, numberOfResults } = opts;

  if (!questionUid || !numberOfResults) {
    throw new Error('Missing required parameters');
  }

  // only return the fastest times for correct answers
  return await prisma.answers.findMany({
    where: {
      questionUid,
      AND: {
        correctAnswer: true,
      },
    },
    take: numberOfResults,
    orderBy: {
      timeTaken: 'asc',
    },
  });
};
