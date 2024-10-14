'use server';

import { prisma } from '@/utils/prisma';
import { getUserFromDb } from '../user/get-user';

export const getFastestTimes = async (opts: {
  questionUid: string;
  numberOfResults: number;
}) => {
  const { questionUid, numberOfResults } = opts;

  if (!questionUid || !numberOfResults) {
    throw new Error('Missing required parameters');
  }

  // only return the fastest times for correct answers
  const answers = await prisma.answers.findMany({
    where: {
      questionUid,
      correctAnswer: true,
    },
    take: numberOfResults,
    orderBy: {
      timeTaken: 'asc',
    },
  });

  // get the user data for each answer
  const usersData = await Promise.all(
    answers.map(async (answer) => {
      const userData = await getUserFromDb(answer.userUid);
      return {
        ...answer,
        user: userData,
      };
    })
  );

  return {
    fastestTimes: usersData,
  };
};
