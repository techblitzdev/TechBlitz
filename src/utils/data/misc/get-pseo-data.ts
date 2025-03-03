import { prisma } from '@/lib/prisma';

export const getPseoData = async (slug: string) => {
  const pseoData = await prisma.pseoPages.findFirst({
    where: {
      AND: [{ slug }, { isPublished: true }],
    },
  });

  if (!pseoData) {
    return null;
  }

  return pseoData;
};
