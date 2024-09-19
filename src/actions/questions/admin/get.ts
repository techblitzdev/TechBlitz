'use server';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';

type GetQuestionsOpts = {};

export const getQuestions = async (opts: { from: number; to: number }) => {
  const { from, to } = opts;

  try {
    // limit to 10 posts per page
    const res = await prisma.questions.findMany({
      skip: from,
      take: to,
      orderBy: {
        questionDate: 'desc',
      },
      include: {
        answers: true,
      },
    });
    revalidateTag('questions');

    return res;
  } catch (error) {
    console.error('Failed to get questions:', error);
    if (error instanceof Error) return error.message;
  }
};
