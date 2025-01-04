'use server';
import { useUserServer } from '@/hooks/use-user-server';
import { prisma } from '@/utils/prisma';

/**
 * Retrieve a random question
 *
 * @param currentQuestionId - The uid of the current question
 * @returns The uid of the next question
 */
export const getRandomQuestion = async (opts: {
  currentQuestionId: string;
}) => {
  const { currentQuestionId } = opts;

  // if the we have a user, we will get a question that the user hasn't answered
  // if the user is not logged in, we will get a random question
  const user = await useUserServer();

  let question;

  if (user) {
    // Get a question that the user hasn't answered
    question = await prisma.questions.findFirst({
      where: {
        uid: {
          not: currentQuestionId,
        },
        AND: {
          userAnswers: {
            none: {
              userUid: user.uid,
            },
          },
        },
      },
    });
  }

  // get a random question as the user is not logged in
  question = await prisma.questions.findFirst({
    where: {
      uid: {
        not: currentQuestionId,
      },
    },
  });

  return question?.uid;
};
