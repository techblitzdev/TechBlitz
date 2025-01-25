import { prisma } from '@/lib/prisma';

export const getStudyPath = async (slug: string) => {
  return await prisma.studyPath.findUnique({
    where: {
      slug,
    },
  });
};
