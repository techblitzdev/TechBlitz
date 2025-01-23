'use server';

import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';

export const bookmarkQuestion = async (questionUid: string) => {
  const user = await getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const question = await prisma.questions.findUnique({
    where: { uid: questionUid },
  });

  if (!question) {
    throw new Error('Question not found');
  }

  const existingBookmark = await prisma.userBookmarks.findFirst({
    where: {
      userId: user.uid,
      questionId: question.uid,
    },
  });

  if (existingBookmark) {
    // If the bookmark exists, remove it
    await prisma.userBookmarks.delete({
      where: { uid: existingBookmark.uid },
    });
    return { action: 'unbookmarked' };
  } else {
    // If the bookmark doesn't exist, create it
    await prisma.userBookmarks.create({
      data: {
        userId: user.uid,
        questionId: question.uid,
      },
    });
    return { action: 'bookmarked' };
  }
};
