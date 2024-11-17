'use server';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';

export const userAnsweredDailyQuestion = async (opts: {
  questionUid: string;
  userUid: string;
}) => {
  const { questionUid, userUid } = opts;

  const userAnswer = await prisma.answers.findFirst({
    where: {
      userUid,
      AND: {
        questionUid,
      },
    },
  });

  revalidateTag(`user-has-answered-daily-question-${questionUid}`);

  return !!userAnswer;
};
