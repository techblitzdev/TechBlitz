'use server';

import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';

/**
 * Get a study path by its slug (via a post request for CSR)
 * @param slug - The slug of the study path
 * @returns The study path
 */
export const getStudyPathPost = async (slug: string) => {
  return await prisma.studyPath.findUnique({
    where: {
      slug,
    },
  });
};

type GetStudyPathQuestionsOpts = { questionSlugs: string[] };

export const getStudyPathQuestions = async (opts: GetStudyPathQuestionsOpts) => {
  const user = await getUser();
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
      userAnswers: {
        where: {
          userUid: user?.uid,
        },
      },
    },
  });

  return res;
};
