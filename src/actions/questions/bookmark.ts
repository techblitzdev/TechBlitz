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

  return await prisma.users.update({
    where: { uid: user.uid },
    data: {
      bookmarks: {
        connect: { uid: questionUid },
      },
    },
  });
};
