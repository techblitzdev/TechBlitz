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
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  // Transform the questions to match the expected format
  const transformedQuestions = questions.map((question) => ({
    ...question,
    tags: question.tags.map((tagRelation) => ({
      uid: tagRelation.tag.uid,
      questionId: tagRelation.questionId,
      tagId: tagRelation.tagId,
      name: tagRelation.tag.name,
    })),
  }));

  const total = await prisma.questions.count();

  return {
    questions: transformedQuestions,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};
