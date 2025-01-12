import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

/**
 * Method for getting questions by tag or an array of tags.
 * Will return questions that match any of the provided tags.
 *
 * @param tag - the tag or an array of tags
 * @returns - the questions
 */
export const getQuestionsByTag = async (tag: string | string[]) => {
  const user = await getUser();

  // if we the user is logged in, we want to include the user's answers in the questions
  const includeUserAnswers = user ? true : false;

  // First find the questions directly with a take limit
  const questions = await prisma.questions.findMany({
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
      userAnswers: includeUserAnswers
        ? {
            where: {
              userUid: user?.uid,
            },
          }
        : undefined,
    },
    take: 10,
  });

  // Then structure the response to match the expected format
  const tags = await prisma.tag.findMany({
    where: {
      name: typeof tag === 'string' ? tag : { in: tag },
    },
    include: {
      questions: {
        where: {
          questionId: {
            in: questions.map((q) => q.uid),
          },
        },
        include: {
          question: {
            include: {
              tags: {
                include: {
                  tag: true,
                },
              },
              userAnswers: includeUserAnswers
                ? {
                    where: {
                      userUid: user?.uid,
                    },
                  }
                : undefined,
            },
          },
        },
      },
    },
  });

  return tags;
};
