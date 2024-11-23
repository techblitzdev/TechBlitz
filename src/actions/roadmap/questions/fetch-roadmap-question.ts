'use server';
import { prisma } from '@/utils/prisma';

export const fetchRoadmapQuestion = async (questionUid: string) => {
  return await prisma.roadmapUserQuestions.findUnique({
    where: {
      uid: questionUid,
    },
    include: {
      answers: true,
    },
  });
};
