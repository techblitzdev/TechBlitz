'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';

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
      answerUid: null,
      userUid: user.uid,
      correctAnswer: correctAnswers[index],
      timeTaken: 0,
      allPassed: false,
      studyPathSlug: null,
    })),
  });

  return answers;
};
