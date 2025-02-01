import { prisma } from "@/lib/prisma";
import type {
  Question,
  QuestionDifficulty,
  QuestionWithoutAnswers,
} from "@/types/Questions";
import { getTagsFromQuestion } from "./tags/get-tags-from-question";
import { QuestionFilters } from "@/types/Filters";
import { getUser } from "@/actions/user/authed/get-user";
import { Answer } from "@/types/Answers";
import { cache } from "react";

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
  opts: GetQuestionsOpts,
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
    throw new Error("Unauthorized access to custom questions");
  }

  // if we have an authenticated user, we include the userAnswers in the query
  const includeUserAnswers = Boolean(user);

  return cache(async () => {
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
        filters?.answered === true
          ? {
              userAnswers: {
                some: {
                  userUid,
                },
              },
            }
          : filters?.answered === false
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
        // question type filter
        filters?.questionType !== undefined
          ? {
              questionType: filters.questionType,
            }
          : {},

        // bookmarked filter
        filters?.bookmarked === true
          ? {
              bookmarks: {
                some: {
                  userId: user?.uid,
                },
              },
            }
          : {},

        // premium question filter
        filters?.isPremiumQuestion === true
          ? {
              isPremiumQuestion: true,
            }
          : {},
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
        // the slug must be generated in order to return it from here
        // otherwise we will not be able to fetch the question by slug
        slugGenerated: true,
      });
    }

    // Fetch questions with security constraints
    const questions = await prisma.questions.findMany({
      skip,
      take: pageSize,
      orderBy: [
        filters?.sortBy === "date"
          ? {
              questionDate: filters?.ascending ? "asc" : "desc",
            }
          : filters?.sortBy === "submissions"
            ? {
                userAnswers: {
                  _count: "desc",
                },
              }
            : {},
      ],
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
        bookmarks: {
          select: {
            userId: true,
          },
        },
      },
    });

    // Transform the questions
    const transformedQuestions = getTagsFromQuestion(
      questions.filter((question) => {
        if (!question.customQuestion) return true;
        return question.linkedReports.length > 0;
      }) as unknown as Question[] & {
        userAnswers: Answer[] | null;
      },
    );

    // Get total count with same security constraints
    const total = await prisma.questions.count({
      where: baseWhereClause,
    });

    return {
      questions: transformedQuestions as
        | (Question[] & {
            userAnswers: Answer[] | null;
          })
        | (QuestionWithoutAnswers[] & {
            userAnswers: Answer[] | null;
          }),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  })();
};
