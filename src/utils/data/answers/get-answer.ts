import { prisma } from '@/lib/prisma';

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
  const { questionUid } = opts;

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
