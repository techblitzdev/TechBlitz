import { prisma } from '@/lib/prisma';

/**
 * Method for getting questions by tag or an array of tags.
 *
 * @param tag - the tag or an array of tags
 * @returns - the questions
 */
export const getQuestionsByTag = async (tag: string | string[]) => {
  return await prisma.questions.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: typeof tag === 'string' ? tag : { in: tag },
          },
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
    take: 10,
  });
};
