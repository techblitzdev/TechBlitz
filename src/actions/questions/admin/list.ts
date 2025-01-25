import { prisma } from '@/lib/prisma';

type GetQuestionsOpts = { questionSlugs: string[] };

export const getQuestions = async (opts: GetQuestionsOpts) => {
  const { questionSlugs } = opts;

  const res = await prisma.questions.findMany({
    where: {
      slug: {
        in: questionSlugs,
      },
    },
    include: {
      answers: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  // current date
  return res;
};
