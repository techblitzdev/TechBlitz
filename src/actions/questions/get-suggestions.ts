'use server';

import { prisma } from '@/utils/prisma';
import { extractTagIds } from './utils/get-tags-from-question';
import type { QuestionWithTags } from '@/types/Questions';
import { cache } from 'react';

type SuggestionsOptions = {
  userUid: string;
  limit?: number;
};

export const getSuggestions = cache(
  async ({ userUid, limit = 5 }: SuggestionsOptions) => {
    try {
      if (!userUid) {
        throw new Error('User ID is required');
      }

      // Get user's answer history with questions and tags
      const userAnswers = await prisma.answers.findMany({
        where: { userUid },
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

      // Separate answers into correct and incorrect
      const { incorrectAnswers } = userAnswers.reduce<{
        correctAnswers: QuestionWithTags[];
        incorrectAnswers: QuestionWithTags[];
      }>(
        (acc, answer) => {
          const question = answer.question as QuestionWithTags;
          if (answer.correctAnswer) {
            acc.correctAnswers.push(question);
          } else {
            acc.incorrectAnswers.push(question);
          }
          return acc;
        },
        { correctAnswers: [], incorrectAnswers: [] }
      );

      // Extract tag IDs from questions
      const tagIds = extractTagIds(incorrectAnswers);

      // Find questions with similar tags that haven't been answered
      const answeredQuestionIds = userAnswers.map(
        (answer) => answer.question.uid
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

      return suggestions;
    } catch (error) {
      console.error('Error getting suggestions:', error);
      throw new Error('Failed to get question suggestions');
    }
  }
);
