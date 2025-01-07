'use server';
import { prisma } from '@/lib/prisma';

export const fetchRoadmapQuestionViaOrder = async (order: number) => {
  const number = parseInt(order.toString());

  return await prisma.defaultRoadmapQuestions.findFirst({
    where: {
      order: number,
    },
    include: {
      answers: true,
    },
  });
};
