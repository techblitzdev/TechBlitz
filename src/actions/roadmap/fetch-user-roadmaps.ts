'use server';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export const fetchUserRoadmaps = async (userUid: string) => {
  revalidateTag('roadmaps');

  return await prisma.userRoadmaps.findMany({
    where: {
      userUid,
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
  });
};
