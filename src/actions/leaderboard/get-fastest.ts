'use server';
import { AnswerWithUser } from '@/types/Answers';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';

type GetFastestTimesReturnType = {
  fastestTimes: AnswerWithUser[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export const getFastestTimes = async (opts: {
  questionUid: string;
  numberOfResults?: number;
  page?: number;
  pageSize?: number;
}): Promise<GetFastestTimesReturnType> => {
  const { questionUid, numberOfResults, page = 1, pageSize = 20 } = opts;

  if (!questionUid) {
    return { fastestTimes: [], total: 0, page: 1, pageSize, totalPages: 1 };
  }

  const skip = (page - 1) * pageSize;

  // only return answer where the user has showTimeTaken set to true
  const answers = await prisma.answers.findMany({
    where: {
      questionUid,
      correctAnswer: true,
      user: {
        showTimeTaken: true,
      },
    },
    take: pageSize, // Correctly set the limit
    skip, // Correctly set the offset
    orderBy: {
      timeTaken: 'asc',
    },
    include: {
      user: true,
    },
  });

  const total = await prisma.answers.count({
    where: {
      questionUid,
      correctAnswer: true,
    },
  });

  return {
    fastestTimes: answers,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};
