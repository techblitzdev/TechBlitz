'use server';
import { prisma } from '@/utils/prisma';
import { getUserFromDb } from '../user/get-user';

export const getPreviousQuestions = async (opts: {
  userUid: string;
  orderBy: 'asc' | 'desc';
  from: number;
  to: number;
}) => {
  const { userUid, orderBy, from, to } = opts;
  // get the user
  const user = await getUserFromDb(userUid);
  // only allow authed users to hit this endpoint
  if (!user) {
    return;
  }

  // get the current date
  const todayDate = new Date().toISOString();

  // get all of the previously asked questions
  return await prisma.questions.findMany({
    where: {
      questionDate: {
        lt: todayDate,
      },
    },
    orderBy: {
      questionDate: orderBy,
    },
    skip: from,
    take: to,
  });
};
