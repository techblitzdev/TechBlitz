import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import type {
  Question,
  QuestionDifficulty,
  QuestionWithoutAnswers,
} from '@/types/Questions';
import { getTagsFromQuestion } from './tags/get-tags-from-question';
import { QuestionFilters } from '@/types/Filters';
import { getUser } from '@/actions/user/authed/get-user';
import { Answer } from '@/types/Answers';

type ListQuestionsReturnType = {
  questions:
    | (Question[] & {
        userAnswers: Answer[] | null;
      })
    | (QuestionWithoutAnswers[] & {
        userAnswers: Answer[] | null;
      });
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

  const user = await getUser();

  if (customQuestions && !user) {
    throw new Error('Unauthorized access to custom questions');
  }

  // if we have an authenticated user, we include the userAnswers in the query
  const includeUserAnswers = Boolean(user);

  return unstable_cache(
    async () => {
      const skip = (page - 1) * pageSize;

      // Base where clause
      const baseWhereClause: any = {
        AND: [
          // Difficulty filter
          filters?.difficulty
            ? {
                difficulty:
                  filters.difficulty.toUpperCase() as QuestionDifficulty,
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
          userAnswers: includeUserAnswers
            ? {
                where: {
                  userUid: userUid,
                },
              }
            : undefined,
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
        }) as unknown as Question[]
      );

      // Get total count with same security constraints
      const total = await prisma.questions.count({
        where: baseWhereClause,
      });
      return {
        questions: transformedQuestions as
          | Question[]
          | QuestionWithoutAnswers[],
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    },
    [
      `questions-list-${userUid}-${page}-${pageSize}-${JSON.stringify(filters)}-${customQuestions}-${previousQuestions}`,
    ],
    {
      revalidate: 60, // Cache for 1 minute
      tags: ['questions-list'],
    }
  )();
};
