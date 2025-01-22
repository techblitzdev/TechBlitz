import { Tags } from '@/types/Tags';
import { prisma } from '@/lib/prisma';

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

  return await prisma.questions.findMany({
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
};
