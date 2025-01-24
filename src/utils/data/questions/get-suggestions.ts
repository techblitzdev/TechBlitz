import { prisma } from '@/lib/prisma';
import { extractTagIds } from './tags/get-tags-from-question';
import type { QuestionDifficulty, QuestionWithTags } from '@/types/Questions';
import { getUser } from '../../../actions/user/authed/get-user';
import { cache } from 'react';

type SuggestionsOptions = {
  limit?: number;
};

export const getSuggestions = cache(
  async ({ limit = 5 }: SuggestionsOptions) => {
    const user = await getUser();

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

    if (!userAnswers.length) {
      console.log('No user answers found');
      return null;
    }

    // Separate answers into incorrect ones
    const incorrectAnswers = userAnswers.reduce<QuestionWithTags[]>(
      (acc, answer) => {
        if (!answer.correctAnswer) {
          // Explicitly cast the question to QuestionWithTags
          const question = answer.question as unknown as QuestionWithTags;
          acc.push(question);
        }
        return acc;
      },
      []
    );

    // Extract tag IDs from questions
    const tagIds = extractTagIds(incorrectAnswers);

    // Find questions with similar tags that haven't been answered
    const answeredQuestionIds = userAnswers.map(
      (answer) => answer.question.uid
    );

    // ensure the user has not answered the question
    const suggestions = await prisma.questions.findMany({
      where: {
        // filter by difficulty of the users experience level
        difficulty: difficultyMap[
          user?.experienceLevel || 'BEGINNER'
        ] as QuestionDifficulty,
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

    // if no suggestions found, return 5 questions with any difficulty
    if (!suggestions.length) {
      const randomQuestions = await prisma.questions.findMany({
        where: {
          NOT: {
            uid: {
              in: answeredQuestionIds,
            },
          },
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

      return randomQuestions;
    }

    return suggestions;
  }
);
