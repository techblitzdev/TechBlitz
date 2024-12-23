'use server';
import { prisma } from '@/utils/prisma';
import { Question } from '@/types/Questions';
import { Answer } from '@/types/Answers';

import { UserRecord } from '@/types/User';
import { QuestionFilters } from '@/types/Filters';
interface PaginatedResponse {
  questions: Question[]; // Replace 'any' with your Question type
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  answers: Answer[];
}

export const getPreviousQuestions = async (opts: {
  user: UserRecord;
  page?: number;
  pageSize?: number;
  filters: QuestionFilters;
}): Promise<PaginatedResponse | undefined> => {
  const { user, page = 1, pageSize = 5, filters } = opts;

  // only allow authed users to hit this endpoint
  if (!user) {
    return;
  }

  const skip = (page - 1) * pageSize;

  const whereClause = {
    where: {
      AND: [
        filters?.difficulty
          ? {
              difficulty: filters.difficulty,
            }
          : {},
        filters?.completed === true
          ? {
              userAnswers: {
                some: {
                  userUid: user.uid,
                },
              },
            }
          : filters?.completed === false
            ? {
                userAnswers: {
                  none: {
                    userUid: user.uid,
                  },
                },
              }
            : {},
        filters?.tags && filters.tags.length > 0
          ? {
              tags: {
                some: {
                  tag: {
                    name: { in: filters.tags },
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
        {
          // ensure only daily questions are fetched
          dailyQuestion: true,
        },
      ],
    },
  };

  // Get total count and questions in parallel
  const [total, questions, answers] = await Promise.all([
    prisma.questions.count({
      where: whereClause.where, // Use the same where clause as the query
    }),
    prisma.questions.findMany({
      ...whereClause,
      orderBy: {
        questionDate: filters?.ascending ? 'asc' : 'desc',
      },
      skip,
      take: pageSize,
      include: {
        answers: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    }),

    // get the user's answers to the questions
    prisma.answers.findMany({
      where: {
        userUid: user.uid,
      },
    }),
  ]);

  return {
    questions,
    total,
    answers,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};
