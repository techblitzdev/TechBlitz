'use server';
import { prisma } from '@/utils/prisma';

export const fetchRoadmapQuestionViaOrder = async (order: number) => {
  const number = parseInt(order.toString());

  return await prisma.roadmapUserQuestions.findFirst({
    where: {
      order: number,
    },
    include: {
      answers: true,
    },
  });
};
