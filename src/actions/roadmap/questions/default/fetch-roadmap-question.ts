'use server';
import { prisma } from '@/utils/prisma';

export const fetchRoadmapQuestion = async (questionUid: string) => {
  return await prisma.defaultRoadmapQuestions.findUnique({
    where: {
      uid: questionUid,
    },
    include: {
      answers: true,
    },
  });
};
