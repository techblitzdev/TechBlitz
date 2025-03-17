import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

/**
 * Optional provide the number of questions you want to check the user has answered
 *
 * @param opts - The options for the user
 * @returns True if the user has answered any question, false otherwise
 */
export const userHasAnsweredAnyQuestion = async ({
  numberOfQuestions = 1,
}: {
  numberOfQuestions?: number;
}) => {
  const user = await getUser();

  if (!user) {
    return {
      hasAnsweredEnoughQuestions: false,
      answeredQuestionsCount: 0,
    };
  }

  const userAnswers = await prisma.answers.findMany({
    where: {
      userUid: user.uid,
    },
  });

  return {
    hasAnsweredEnoughQuestions: userAnswers.length >= numberOfQuestions,
    answeredQuestionsCount: userAnswers.length,
  };
};
