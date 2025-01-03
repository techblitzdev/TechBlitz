'use server';

import { prisma } from '@/utils/prisma';
import type {
  Question,
  QuestionDifficulty,
  QuestionWithoutAnswers,
} from '@/types/Questions';
import { getTagsFromQuestion } from './utils/get-tags-from-question';
import { QuestionFilters } from '@/types/Filters';
import { getUser } from '../user/authed/get-user';

type ListQuestionsReturnType = {
  questions: Question[] | QuestionWithoutAnswers[];
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
  customQuestions?: boolean;
  previousQuestions?: boolean;
};

export const listQuestions = async (
  opts: GetQuestionsOpts
): Promise<ListQuestionsReturnType> => {
  const {
    page = 1,
    pageSize = 10,
    filters,
    userUid,
    customQuestions = false,
    previousQuestions = false,
  } = opts;

  const skip = (page - 1) * pageSize;

  // Always get the authenticated user when dealing with custom questions
  let authenticatedUser = null;
  if (customQuestions) {
    authenticatedUser = await getUser();

    if (!authenticatedUser || authenticatedUser.uid !== userUid) {
      throw new Error('Unauthorized access to custom questions');
    }
  }

  // Base where clause
  const baseWhereClause: any = {
    AND: [
      // Difficulty filter
      filters?.difficulty
        ? {
            difficulty: filters.difficulty.toUpperCase() as QuestionDifficulty,
          }
        : {},

      // Completion filter
      filters?.completed === true
        ? {
            userAnswers: {
              some: {
                userUid,
              },
            },
          }
        : filters?.completed === false
          ? {
              userAnswers: {
                none: {
                  userUid,
                },
              },
            }
          : {},

      // Tags filter
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

      // Date constraints
      previousQuestions
        ? {
            questionDate: {
              lte: new Date().toISOString(),
            },
            dailyQuestion: true,
          }
        : {
            questionDate: {
              lte: new Date().toISOString(),
            },
          },
    ],
  };

  // Add custom questions filter
  if (customQuestions) {
    baseWhereClause.AND.push({
      customQuestion: true,
      linkedReports: {
        some: {
          userUid: userUid,
        },
      },
    });
  } else {
    baseWhereClause.AND.push({
      customQuestion: false,
    });
  }

  // Fetch questions with security constraints
  const questions = await prisma.questions.findMany({
    skip,
    take: pageSize,
    orderBy: {
      questionDate: filters?.ascending ? 'asc' : 'desc',
    },
    where: baseWhereClause,
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
      linkedReports: {
        select: {
          userUid: true,
        },
        where: {
          userUid,
        },
      },
    },
  });

  // Transform the questions
  const transformedQuestions = getTagsFromQuestion(
    questions.filter((question) => {
      if (!question.customQuestion) return true;
      return question.linkedReports.length > 0;
    }) as Question[]
  );

  // Get total count with same security constraints
  const total = await prisma.questions.count({
    where: baseWhereClause,
  });
  return {
    questions: transformedQuestions as Question[] | QuestionWithoutAnswers[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};
