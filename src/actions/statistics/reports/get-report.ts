'use server';

import { prisma } from '@/utils/prisma';

export const getReport = async (uid: string) => {
  return await prisma.statisticsReport.findUnique({
    where: { uid },
  });
};
