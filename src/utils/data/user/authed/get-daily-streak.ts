'use server';

import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export const getUserDailyStats = async () => {
  const user = await getUser();
  if (!user) return null;

  const userData = await prisma.users.findUnique({
    where: {
      uid: user.uid,
    },
    include: {
      streak: true,
    },
  });
  if (!userData) return null;

  const streakData = userData.streak;

  revalidateTag(`user-streak-${user.uid}`);

  return { streakData };
};
