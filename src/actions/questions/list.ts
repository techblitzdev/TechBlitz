'use server';
import { prisma } from '@/utils/prisma';
import type { QuestionWithoutAnswers } from '@/types/Questions';
import { getTagsFromQuestion } from '../utils/get-tags-from-question';

type ListQuestionsReturnType = {
  questions: QuestionWithoutAnswers[];
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
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  // Transform the questions to match the expected format
  const transformedQuestions = getTagsFromQuestion(
    questions
  ) as unknown as QuestionWithoutAnswers[];

  const total = await prisma.questions.count();

  return {
    questions: transformedQuestions,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};
