'use server';
import { prisma } from '@/utils/prisma';
import { getUserFromDb } from '../user/get-user';
import { Question, QuestionWithoutAnswers } from '@/types/Questions';
import { Answer } from '@/types/Answers';

interface PaginatedResponse {
  questions: Question[]; // Replace 'any' with your Question type
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  answers: Answer[];
}

export const getPreviousQuestions = async (opts: {
  userUid: string;
  orderBy: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResponse | undefined> => {
  const { userUid, orderBy, page = 0, pageSize = 5 } = opts;

  const skip = page * pageSize;

  // get the user
  const user = await getUserFromDb(userUid);

  // only allow authed users to hit this endpoint
  if (!user) {
    return;
  }

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
      where: {
        questionDate: {
          lt: todayDate,
        },
        AND: {
          dailyQuestion: true,
        },
      },
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
        userUid,
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
