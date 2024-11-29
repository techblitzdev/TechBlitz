'use server';
import { prisma } from '@/utils/prisma';

export const fetchAllRoadmapQuestions = async () => {
  return await prisma.defaultRoadmapQuestions.findMany({
    orderBy: {
      order: 'asc'
    }
  });
};

export const defaultRoadmapQuestionCount = async () => {
  return await prisma.defaultRoadmapQuestions.count();
};
