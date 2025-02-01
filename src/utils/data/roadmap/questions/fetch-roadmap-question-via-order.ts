import { prisma } from '@/lib/prisma';

/**
 * Method for retrieving an onboarding roadmap question by its index.
 *
 * @param order
 * @returns
 */
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
