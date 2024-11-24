'use server';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';

export async function deleteRoadmap(roadmapUid: string, userUid: string) {
  const roadmap = await prisma.userRoadmaps.delete({
    where: {
      uid: roadmapUid,
      AND: {
        userUid,
      },
    },
  });

  revalidateTag('roadmaps');

  return roadmap;
}
