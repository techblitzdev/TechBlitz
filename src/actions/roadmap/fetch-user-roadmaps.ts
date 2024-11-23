'use server';
import { prisma } from '@/utils/prisma';

export const fetchUserRoadmaps = async (userUid: string) => {
  return await prisma.userRoadmaps.findMany({
    where: {
      userUid,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
