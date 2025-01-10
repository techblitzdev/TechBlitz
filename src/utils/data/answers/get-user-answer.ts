'use server';
import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

/**
 * Gets the answer for a given question uid
 * and user uid
 *
 * @param opts - Options containing the questionUid
 * @returns - The user's answer or null if not found
 */
export const getUserAnswer = async (opts: { questionUid: string }) => {
  const { questionUid } = opts;

  const user = await getUser();

  if (!user) {
    return null; // Return null instead of false for better type consistency
  }

  try {
    // Find the answer to the question
    return await prisma.answers.findFirst({
      where: {
        questionUid,
        userUid: user.uid, // user?.uid is unnecessary since we check for user existence
      },
    });
  } catch (error) {
    console.error('Error fetching user answer:', error);
    throw new Error('Could not fetch user answer. Please try again later.'); // Handle the error gracefully
  }
};
