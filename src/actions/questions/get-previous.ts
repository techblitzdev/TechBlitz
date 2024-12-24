'use server';
import { prisma } from '@/utils/prisma';
import { Question, QuestionDifficulty } from '@/types/Questions';
import { Answer } from '@/types/Answers';

import { UserRecord } from '@/types/User';
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
  orderBy: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
  filters: {
    ascending: boolean;
    difficulty: QuestionDifficulty;
    completed: boolean;
    tags: string[];
  };
}): Promise<PaginatedResponse | undefined> => {
  const { user, orderBy, page = 0, pageSize = 5, filters } = opts;

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
        filters?.tags.length > 0
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

  // get the current date
  const todayDate = new Date().toISOString();

  // Get total count and questions in parallel
  const [total, questions, answers] = await Promise.all([
    prisma.questions.count({
      where: {
        questionDate: {
          lt: todayDate,
        },
      },
    }),
    prisma.questions.findMany({
      ...whereClause,
      orderBy: {
        questionDate: orderBy,
      },
      skip,
      take: pageSize, // Calculate the correct number of items to take
      include: {
        answers: true, // Include the answers in the query
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
