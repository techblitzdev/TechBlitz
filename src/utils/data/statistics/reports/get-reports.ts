import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

export const getUserReports = async (take: number = 5) => {
  // validate that we have a user before grabbing their user level
  const user = await getUser();
  if (!user) return [];

  // the user must have premium access to have reports.
  if (!['PREMIUM', 'ADMIN'].includes(user.userLevel)) {
    throw new Error('Premium access required');
  }

  // get the user's reports
  return await prisma.statisticsReport.findMany({
    where: {
      userUid: user.uid,
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take,
  });
};
