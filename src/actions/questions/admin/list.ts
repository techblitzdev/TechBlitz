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
    },
  });

  // current date
  return res;
};
