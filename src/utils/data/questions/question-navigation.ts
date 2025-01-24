import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

export const getNextAndPreviousQuestion = async (uid: string) => {
  const user = await getUser();

  // Get the current question with next/prev questions
  const currentQuestion = await prisma.questions.findUnique({
    where: { uid },
    select: {
      createdAt: true,
      nextQuestionSlug: true,
      previousQuestionSlug: true,
    },
  });

  if (!currentQuestion) return null;

  // If next/prev questions are stored, fetch them
  if (
    currentQuestion.nextQuestionSlug ||
    currentQuestion.previousQuestionSlug
  ) {
    const [nextQuestion, previousQuestion] = await Promise.all([
      currentQuestion.nextQuestionSlug
        ? prisma.questions.findUnique({
            where: { slug: currentQuestion.nextQuestionSlug },
          })
        : null,
      currentQuestion.previousQuestionSlug
        ? prisma.questions.findUnique({
            where: { slug: currentQuestion.previousQuestionSlug },
          })
        : null,
    ]);

    // If one exists but not the other, get a random question for the missing one
    if (nextQuestion && !previousQuestion) {
      const randomPrevious = await prisma.questions.findFirst({
        where: {
          uid: { not: uid },
          isPremiumQuestion: user?.userLevel === 'FREE' ? false : true,
          customQuestion: user?.userLevel === 'FREE' ? false : true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return {
        nextQuestion: nextQuestion.slug,
        previousQuestion: randomPrevious?.slug,
      };
    }

    if (!nextQuestion && previousQuestion) {
      const randomNext = await prisma.questions.findFirst({
        where: {
          uid: { not: uid },
          isPremiumQuestion: user?.userLevel === 'FREE' ? false : true,
          customQuestion: user?.userLevel === 'FREE' ? false : true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return {
        nextQuestion: randomNext?.slug,
        previousQuestion: previousQuestion.slug,
      };
    }

    if (nextQuestion && previousQuestion) {
      return {
        nextQuestion: nextQuestion.slug,
        previousQuestion: previousQuestion.slug,
      };
    }
  }

  // If no stored next/prev, fall back to createdAt based logic
  const [nextQuestion, previousQuestion] = await Promise.all([
    prisma.questions.findFirst({
      where: {
        createdAt: {
          gt: currentQuestion.createdAt,
        },
        isPremiumQuestion: user?.userLevel === 'FREE' ? false : true,
        customQuestion: user?.userLevel === 'FREE' ? false : true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    }),
    prisma.questions.findFirst({
      where: {
        createdAt: {
          lt: currentQuestion.createdAt,
        },
        isPremiumQuestion: user?.userLevel === 'FREE' ? false : true,
        customQuestion: user?.userLevel === 'FREE' ? false : true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);

  // If no next/prev found, get random questions
  const randomQuestion =
    !nextQuestion || !previousQuestion
      ? await prisma.questions
          .findMany({
            where: {
              uid: {
                not: uid,
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 2,
          })
          // take two for previous and next
          .then((questions) => questions.slice(0, 2))
      : null;

  return {
    nextQuestion: nextQuestion?.slug || randomQuestion?.[1]?.slug,
    previousQuestion: previousQuestion?.slug || randomQuestion?.[0]?.slug,
  };
};
