'use server';

import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';

export const getUserDailyStats = async (userUid: string) => {
  const userData = await prisma.users.findUnique({
    where: {
      uid: userUid,
    },
  });

  if (!userData) return null;

  const { correctDailyStreak, totalDailyStreak } = userData;

  //revalidateTag(`user-streak-${userUid}`);

  return {
    totalDailyStreak,
    correctDailyStreak,
  };
};
