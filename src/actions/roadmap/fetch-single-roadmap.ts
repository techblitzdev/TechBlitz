'use server';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';

export const fetchRoadmap = async (opts: {
  roadmapUid: string;
  userUid: string;
}) => {
  const { roadmapUid, userUid } = opts;

  revalidateTag('roadmap-data');

  return await prisma.userRoadmaps.findUnique({
    where: {
      uid: roadmapUid,
      AND: {
        userUid
      }
    },
    include: {
      questions: {
        include: {
          answers: true
        }
      }
    }
  });
};
