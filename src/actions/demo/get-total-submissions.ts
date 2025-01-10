'use server';
import { prisma } from '@/lib/prisma';

export const getTotalSubmissions = async (opts: { questionSlug: string }) => {
  const { questionSlug } = opts;

  // get the total submissions for the question
  const totalSubmissions = await prisma.demoAnswers.count({
    where: {
      question: {
        slug: questionSlug,
      },
    },
  });

  return {
    totalSubmissions,
  };
};
