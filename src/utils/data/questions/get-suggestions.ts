import { prisma } from '@/lib/prisma';
import { extractTagIds } from './tags/get-tags-from-question';
import type { QuestionWithTags } from '@/types/Questions';
import { unstable_cache as NextCache } from 'next/cache';
import { getUser } from '../../../actions/user/authed/get-user';

type SuggestionsOptions = {
  limit?: number;
};

export const getSuggestions = async ({ limit = 5 }: SuggestionsOptions) => {
  const user = await getUser();

  return NextCache(
    async () => {
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
    },
    ['suggestions'],
    {
      tags: ['suggestions'],
      revalidate: 60 * 60 * 24, // 24 hours
    }
  )();
};
