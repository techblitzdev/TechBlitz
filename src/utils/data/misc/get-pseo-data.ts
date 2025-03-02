import { prisma } from '@/lib/prisma';

export const getPseoData = async (slug: string) => {
  const pseoData = await prisma.pseoPages.findUnique({
    where: {
      slug,
    },
  });

  if (!pseoData) {
    return null;
  }

  console.log({
    pseoData,
  });

  return pseoData;
};
