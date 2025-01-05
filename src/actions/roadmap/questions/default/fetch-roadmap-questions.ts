'use server';
import { prisma } from '@/utils/prisma';

export const defaultRoadmapQuestionCount = async () => {
  return await prisma.defaultRoadmapQuestions.count();
};
