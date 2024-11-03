'use server';
import { prisma } from '@/utils/prisma';

/**
 * Get's the answer for a given question uid
 * and user uid
 *
 * @param opts
 * @returns
 */
export const getUserAnswer = async (opts: {
  questionUid: string;
  userUid: string;
}) => {
  const { questionUid, userUid } = opts;

  try {
    // find the answer to the question
    return await prisma.answers.findFirst({
      where: {
        questionUid,
        userUid,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error getting user answer');
  }
};
