import { prisma } from '@/lib/prisma';

export const getDailyMissions = async () => {
  return await prisma.mission.findMany({
    where: {
      isActive: true,
    },
  });
};
