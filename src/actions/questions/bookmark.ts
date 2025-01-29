'use server';

import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';

export const bookmarkQuestion = async (
  questionUid: string,
  isRoadmap = false
) => {
  const user = await getUser();

  if (!user) {
    throw new Error('User not found');
  }

  // if isRoadmap is true, we are fetching a roadmap question and not a standard
  // question.
  let question;
  if (isRoadmap) {
    question = await prisma.roadmapUserQuestions.findUnique({
      where: { uid: questionUid },
      select: {
        uid: true,
      },
    });
  } else {
    question = await prisma.questions.findUnique({
      where: { uid: questionUid },
      select: {
        uid: true,
      },
    });
  }

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
        ...(isRoadmap
          ? { roadmapUserQuestionId: questionUid }
          : { questionId: questionUid }),
      },
    });
    return { action: 'bookmarked' };
  }
};
