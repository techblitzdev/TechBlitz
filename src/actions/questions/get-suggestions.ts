'use server';

import { prisma } from '@/lib/prisma';
import { extractTagIds } from './utils/get-tags-from-question';
import type { QuestionWithTags } from '@/types/Questions';
import { cache } from 'react';
import { getUser } from '../user/authed/get-user';

type SuggestionsOptions = {
  limit?: number;
};

export const getSuggestions = cache(
  async ({ limit = 5 }: SuggestionsOptions) => {
    // get the user server side
    const user = await getUser();

    try {
      if (!user) {
        throw new Error('User ID is required');
      }

      // Get user's answer history with questions and tags
      const userAnswers = await prisma.answers.findMany({
        where: { userUid: user.uid },
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
        // @ts-ignore
        (acc: QuestionWithTags[], answer) => {
          if (!answer.correctAnswer) {
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
        (answer: { question: { uid: string } }) => answer.question.uid
      );

      const suggestions = await prisma.questions.findMany({
        where: {
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
              dailyQuestion: true,
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

      // if no suggestions found, return 5 random questions
      if (!suggestions.length) {
        const randomQuestions = await prisma.questions.findMany({
          where: {
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

        return randomQuestions;
      }

      console.log({
        suggestions,
      });

      return suggestions;
    } catch (error) {
      console.error('Error getting suggestions:', error);
      throw new Error('Failed to get question suggestions');
    }
  }
);
