'use server';
import { prisma } from '@/utils/prisma';

export const fetchRoadmap = async (opts: {
  roadmapUid: string;
  userUid: string;
}) => {
  const { roadmapUid, userUid } = opts;

  return await prisma.userRoadmaps.findUnique({
    where: {
      uid: roadmapUid,
      AND: {
        userUid,
      },
    },
  });
};
