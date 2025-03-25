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
        userUid: user.uid,
      },
    });
  } catch (error) {
    console.error('Error fetching user answer:', error);
    throw new Error('Could not fetch user answer. Please try again later.'); // Handle the error gracefully
  }
};

export interface RecentUserAnswer {
  uid: string;
  correctAnswer: boolean;
  question: {
    title: string | null;
    slug: string | null;
    question: string | null;
  };
  createdAt: Date;
}

export const getRecentUserAnswers = async ({ take = 10 }: { take?: number }) => {
  const user = await getUser();

  if (!user) {
    return [];
  }

  return await prisma.answers.findMany({
    where: {
      userUid: user.uid,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
    select: {
      correctAnswer: true,
      question: {
        select: {
          title: true,
          slug: true,
          question: true,
        },
      },
      createdAt: true,
      uid: true,
    },
  });
};
