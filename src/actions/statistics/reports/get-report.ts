'use server';

import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/utils/prisma';

export const getReport = async (uid: string) => {
  const user = await getUser();

  if (!user) {
    throw new Error('User not found');
  }

  return await prisma.statisticsReport.findUnique({
    where: { uid, userUid: user.uid },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });
};
