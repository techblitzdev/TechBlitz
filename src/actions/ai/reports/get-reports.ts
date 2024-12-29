'use server';

import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/utils/prisma';

export const getUserLevel = async () => {
  // validate that we have a user before grabbing their user level
  const user = await getUser();
  if (!user) throw new Error('User not found');

  // the user must have premium access to have reports.
  if (!['PREMIUM', 'ADMIN'].includes(user.userLevel)) {
    throw new Error('Premium access required');
  }

  // get the user's reports
  const reports = await prisma.statisticsReport.findMany({
    where: {
      userUid: user.uid,
    },
  });

  return reports;
};
