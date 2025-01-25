import { prisma } from '@/lib/prisma';

type GetQuestionsOpts = { questionUids: string[] };

export const getQuestions = async (opts: GetQuestionsOpts) => {
  const { questionUids } = opts;

  const res = await prisma.questions.findMany({
    where: {
      uid: {
        in: questionUids,
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
