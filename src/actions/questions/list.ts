'use server';
import { prisma } from '@/utils/prisma';
import type { Question } from '@/types/Questions';

type ListQuestionsReturnType = {
  questions: Omit<Question, 'answers'>[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

type GetQuestionsOpts = {
  page?: number;
  pageSize?: number;
};

export const listQuestions = async (
  opts: GetQuestionsOpts
): Promise<ListQuestionsReturnType> => {
  const { page = 0, pageSize = 10 } = opts;

  const skip = page * pageSize;

  const questions = await prisma.questions.findMany({
    skip,
    take: pageSize,
    orderBy: {
      questionDate: 'asc',
    },
  });

  const total = await prisma.questions.count();

  return {
    questions,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};
