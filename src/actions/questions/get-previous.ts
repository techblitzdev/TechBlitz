'use server';
import { prisma } from '@/utils/prisma';
import { getUserFromDb } from '../user/get-user';
import { Question } from '@/types/Questions';

interface PaginatedResponse {
  questions: Question[]; // Replace 'any' with your Question type
  total: number;
}

export const getPreviousQuestions = async (opts: {
  userUid: string;
  orderBy: 'asc' | 'desc';
  from: number;
  to: number;
}): Promise<PaginatedResponse | undefined> => {
  const { userUid, orderBy, from, to } = opts;

  // get the user
  const user = await getUserFromDb(userUid);

  // only allow authed users to hit this endpoint
  if (!user) {
    return;
  }

  // get the current date
  const todayDate = new Date().toISOString();

  // Get total count and questions in parallel
  const [total, questions] = await Promise.all([
    prisma.questions.count({
      where: {
        questionDate: {
          lt: todayDate,
        },
      },
    }),
    prisma.questions.findMany({
      where: {
        questionDate: {
          lt: todayDate,
        },
      },
      orderBy: {
        questionDate: orderBy,
      },
      skip: from,
      take: to - from, // Calculate the correct number of items to take
      include: {
        answers: true, // Include the answers in the query
      },
    }),
  ]);

  return {
    questions,
    total,
  };
};
