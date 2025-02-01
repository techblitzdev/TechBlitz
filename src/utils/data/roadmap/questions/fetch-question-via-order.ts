import { prisma } from '@/lib/prisma';

export const fetchRoadmapQuestionViaOrder = async (opts: { order: number; roadmapUid: string }) => {
  const { order, roadmapUid } = opts;

  const number = parseInt(order.toString());

  return await prisma.roadmapUserQuestions.findFirst({
    where: {
      order: number,
      AND: {
        roadmapUid,
      },
    },
    include: {
      answers: true,
    },
  });
};
