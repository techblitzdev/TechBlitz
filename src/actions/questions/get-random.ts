'use server';
import { prisma } from '@/utils/prisma';
import { getUser } from '@/actions/user/authed/get-user';

/**
 * Retrieve a random question
 *
 * @param currentQuestionId - The uid of the current question
 * @returns The uid of the next question
 */
export const getRandomQuestion = async (opts: {
  currentQuestionUid: string;
}) => {
  const { currentQuestionUid } = opts;

  // if the we have a user, we will get a question that the user hasn't answered
  // if the user is not logged in, we will get a random question
  const user = await getUser();

  let question;

  if (user) {
    // Get a question that the user hasn't answered
    question = await prisma.questions.findFirst({
      where: {
        uid: {
          not: currentQuestionUid,
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
        not: currentQuestionUid,
      },
    },
  });

  return question?.uid;
};
