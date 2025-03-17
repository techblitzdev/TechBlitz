'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/user/authed/get-user';
import { findOrCreateUserStreak } from './answer';

/**
 * A method to add the questions the user answered on the onboarding flow
 * to the db.
 *
 * Accepts an array of question uids, and if the user answered correctly.
 */
export const answerOnboardingQuestions = async (
  questionUids: string[],
  correctAnswers: boolean[]
) => {
  const user = await getUser();

  // we need the user in order to add the answers to the db
  if (!user) {
    throw new Error('User not found');
  }

  // add the answers to the db
  const answers = await prisma.answers.createMany({
    data: questionUids.map((questionUid, index) => ({
      questionUid,
      userAnswerUid: null,
      userUid: user.uid,
      correctAnswer: correctAnswers[index],
      timeTaken: 0,
      difficulty: 'EASY',
    })),
  });

  // increment the users streak
  const streak = await findOrCreateUserStreak(user.uid);

  // check if the user has already answered today
  const lastAnswer = await prisma.answers.findFirst({
    where: {
      userUid: user.uid,
      createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    },
  });

  // if not, increment the streak
  if (!lastAnswer) {
    await prisma.streaks.update({
      where: { uid: streak.uid },
      data: { currentstreakCount: streak.currentstreakCount + 1 },
    });
  }

  return answers;
};
