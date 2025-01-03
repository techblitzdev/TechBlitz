'use server';
import { prisma } from '@/utils/prisma';
import type {
  QuestionDifficulty,
  QuestionWithoutAnswers,
} from '@/types/Questions';
import { getTagsFromQuestion } from './utils/get-tags-from-question';
import { QuestionFilters } from '@/types/Filters';

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
  filters?: QuestionFilters;
  userUid: string;
};

export const listQuestions = async (
  opts: GetQuestionsOpts
): Promise<ListQuestionsReturnType> => {
  const { page = 1, pageSize = 10, filters, userUid } = opts;

  const skip = (page - 1) * pageSize;

  // define the where clause for filtering based on difficulty
  const whereClause = {
    where: {
      AND: [
        filters?.difficulty
          ? {
              difficulty:
                filters.difficulty.toUpperCase() as QuestionDifficulty,
            }
          : {},
        filters?.completed === true
          ? {
              userAnswers: {
                some: {
                  // Check if there are answers by the current user
                  userUid,
                },
              },
            }
          : filters?.completed === false
            ? {
                userAnswers: {
                  none: {
                    // Exclude questions answered by the current user
                    userUid,
                  },
                },
              }
            : {},
        filters?.tags?.length
          ? {
              tags: {
                some: {
                  tag: {
                    name: {
                      in: filters.tags,
                    },
                  },
                },
              },
            }
          : {},
        {
          // ensure no daily question in the future are fetched
          questionDate: {
            lte: new Date().toISOString(),
          },
        },
        // ensure no custom questions are fetched
        {
          customQuestion: false,
        },
      ],
    },
  };
  // fetch the paginated questions
  const questions = await prisma.questions.findMany({
    skip,
    take: pageSize,
    orderBy: {
      questionDate: filters?.ascending ? 'asc' : 'desc',
    },
    where: whereClause.where,
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  // transform the questions to match the expected format
  const transformedQuestions = getTagsFromQuestion(
    questions
  ) as unknown as QuestionWithoutAnswers[];

  // fetch the total number of matching questions (without pagination)
  const total = await prisma.questions.count({
    where: whereClause.where,
  });

  return {
    questions: transformedQuestions,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};
