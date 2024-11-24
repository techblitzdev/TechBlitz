'use server';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';

export const updateRoadmapDetails = async (
  roadmapUid: string,
  userUid: string,
  data: {
    title: string;
    description: string;
  }
) => {
  const roadmap = await prisma.userRoadmaps.update({
    where: {
      uid: roadmapUid,
      AND: {
        userUid,
      },
    },
    data,
  });

  revalidateTag('roadmap-data');

  return roadmap;
};
