'use server';
import { prisma } from '@/utils/prisma';

export const fetchUserRoadmaps = async (userUid: string) => {
  return await prisma.userRoadmaps.findMany({
    where: {
      userUid,
    },
    include: {
      DefaultRoadmapQuestionsUsersAnswers: true,
      questions: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
