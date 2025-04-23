import type { Tags } from '@/types';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/user/authed/get-user';
import { QuestionDifficulty } from '@prisma/client';

/**
 * Method to get questions that are related to the current question
 * This is different to 'getSuggestions' as that provides a list
 * of questions on a user level - the return value is based off
 * of what questions that have gotten incorrect in the past.
 * This method is more about getting questions that are similar
 * to the current question.
 */
export const getRelatedQuestions = async (opts: {
  questionSlug: string;
  tags: Tags[];
  limit?: number;
}) => {
  const { questionSlug, tags, limit = 3 } = opts;
  if (!questionSlug) return [];

  const questions = await prisma.questions.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: {
              in: tags.map((tag) => tag.tag.name),
            },
          },
        },
      },
      AND: {
        slug: {
          not: questionSlug,
        },
        customQuestion: false,
      },
    },
    take: limit,
  });

  // if we cannot find any related questions, return random questions relating to the users difficulty level
  if (questions.length !== 0) {
    return questions;
  }

  // create a difficult map for the user
  const difficultyMap = {
    BEGINNER: 'BEGINNER',
    INTERMEDIATE: 'EASY',
    ADVANCED: 'MEDIUM',
    MASTER: 'HARD',
  };

  const user = await getUser();
  return await prisma.questions.findMany({
    where: {
      difficulty: difficultyMap[
        user?.userLevel as keyof typeof difficultyMap
      ] as QuestionDifficulty,
      AND: {
        userAnswers: {
          none: {
            userUid: user?.uid,
          },
        },
      },
    },
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
};
