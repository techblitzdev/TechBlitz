'use server';

import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';

export const deleteReport = async (reportUid: string) => {
  await prisma.statisticsReport.delete({
    where: {
      uid: reportUid,
    },
  });

  revalidateTag('reports');

  return 'ok';
};
