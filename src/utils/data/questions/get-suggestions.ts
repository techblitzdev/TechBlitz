import { prisma } from '@/lib/prisma';
import { extractTagIds } from './tags/get-tags-from-question';
import type { QuestionDifficulty, QuestionWithTags } from '@/types/Questions';
import { getUser, getUserFromDb } from '../../../actions/user/authed/get-user';
import { cache } from 'react';

type SuggestionsOptions = {
  limit?: number;
  // optional - need to pass in if we want to get a suggested challenge for a user
  // from the cron job
  userUid?: string;
};

export const getSuggestions = cache(async ({ limit = 5, userUid }: SuggestionsOptions) => {
  const user = userUid ? await getUserFromDb(userUid) : await getUser();

  // create a difficult map for the user
  const difficultyMap = {
    BEGINNER: 'BEGINNER',
    INTERMEDIATE: 'EASY',
    ADVANCED: 'MEDIUM',
    MASTER: 'HARD',
  };

  // Get user's answer history with questions and tags
  const userAnswers = await prisma.answers.findMany({
    where: { userUid: user?.uid },
    include: {
      question: {
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Get all answered question IDs
  const answeredQuestionIds = userAnswers.map((answer) => answer.question.uid);

  // Try to get questions matching user's experience level and incorrect answers
  let suggestions: QuestionWithTags[] = [];

  if (userAnswers.length) {
    // Separate answers into incorrect ones
    const incorrectAnswers = userAnswers.reduce<QuestionWithTags[]>((acc, answer) => {
      if (!answer.correctAnswer) {
        const question = answer.question as unknown as QuestionWithTags;
        acc.push(question);
      }
      return acc;
    }, []);

    // Extract tag IDs from questions
    const tagIds = extractTagIds(incorrectAnswers);

    // Find questions with similar tags that haven't been answered
    suggestions = await prisma.questions.findMany({
      where: {
        difficulty: difficultyMap[user?.experienceLevel || 'BEGINNER'] as QuestionDifficulty,
        AND: [
          {
            tags: {
              some: {
                tag: {
                  uid: {
                    in: tagIds,
                  },
                },
              },
            },
          },
          {
            customQuestion: false,
          },
          {
            NOT: {
              uid: {
                in: answeredQuestionIds,
              },
            },
          },
        ],
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  // If no suggestions found, try questions matching user's experience level
  if (!suggestions.length) {
    suggestions = await prisma.questions.findMany({
      where: {
        difficulty: difficultyMap[user?.experienceLevel || 'BEGINNER'] as QuestionDifficulty,
        customQuestion: false,
        NOT: {
          uid: {
            in: answeredQuestionIds,
          },
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  // If still no suggestions, get any unanswered questions
  if (!suggestions.length) {
    suggestions = await prisma.questions.findMany({
      where: {
        customQuestion: false,
        NOT: {
          uid: {
            in: answeredQuestionIds,
          },
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  // As a final fallback, get any questions even if already answered
  if (!suggestions.length) {
    suggestions = await prisma.questions.findMany({
      where: {
        customQuestion: false,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  return suggestions;
});
