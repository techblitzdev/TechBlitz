'use server';

import { prisma } from '@/utils/prisma';

export const getUserDailyStats = async (userId: string) => {
  const userData = await prisma.users.findUnique({
    where: {
      uid: userId,
    },
  });

  if (!userData) return null;

  const { correctDailyStreak, totalDailyStreak } = userData;

  return {
    totalDailyStreak,
    correctDailyStreak,
  };
};
