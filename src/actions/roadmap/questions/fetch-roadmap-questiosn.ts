'use server';
import { prisma } from '@/utils/prisma';

export const fetchRoadmapQuestions = async (opts: {
  roadmapUid: string;
  userUid: string;
}) => {
  return await prisma.roadmapUserQuestions.findMany({
    where: {
      roadmapUid: opts.roadmapUid,
    },
    include: {
      answers: true,
    },
  });
};
