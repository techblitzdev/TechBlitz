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
  const { questionUid, numberOfResults, page, pageSize } = opts;

  if (!questionUid)
    return { fastestTimes: [], total: 0, page: 1, pageSize: 1, totalPages: 1 };

  let take: number | undefined;
  let skip: number | undefined;

  if (numberOfResults !== undefined) {
    // Fixed number of results
    take = numberOfResults;
  } else if (page !== undefined && pageSize !== undefined) {
    // Pagination
    take = pageSize;
    skip = (page - 1) * pageSize;
  } else {
    throw new Error(
      'Either numberOfResults or both page and pageSize must be provided'
    );
  }

  // only return the fastest times for correct answers
  const answers = await prisma.answers.findMany({
    where: {
      questionUid,
      correctAnswer: true,
    },
    take,
    skip,
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

  revalidateTag(`leaderboard-${questionUid}`);

  return {
    fastestTimes: answers,
    total,
    page: page || 1,
    pageSize: pageSize || total,
    totalPages: Math.ceil(total / (pageSize || total)),
  };
};
