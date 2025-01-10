import { prisma } from '@/lib/prisma';

/**
 * Method for getting questions by tag or an array of tags.
 * Will return questions that match any of the provided tags.
 *
 * @param tag - the tag or an array of tags
 * @returns - the questions
 */
export const getQuestionsByTag = async (tag: string | string[]) => {
  return await prisma.tag.findMany({
    where: {
      name: typeof tag === 'string' ? tag : { in: tag },
    },
    include: {
      questions: {
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
        where: {
          question: {
            tags: {
              some: {
                tag: {
                  name: typeof tag === 'string' ? tag : { in: tag },
                },
              },
            },
          },
        },
      },
    },
    take: 20,
  });
};
