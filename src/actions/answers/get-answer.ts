'use server';
import { prisma } from '@/utils/prisma';

/**
 * Get the correct answer for a given question
 *
 * @param opts
 * @returns
 */
export const getAnswer = async (opts: {
  questionUid: string;
  userUid: string;
}) => {
  const { questionUid, userUid } = opts;

  // check if the user has answered the question
  // const userHasAnswered = await prisma.answers.findFirst({
  //   where: {
  //     userUid,
  //     questionUid,
  //   },
  // });

  // if (!userHasAnswered) {
  //   throw new Error('User has not answered this question');
  // }

  try {
    // find the answer to the question
    return await prisma.questionAnswers.findFirst({
      where: {
        questionUid,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error getting user answer');
  }
};
