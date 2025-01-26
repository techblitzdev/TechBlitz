'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';

/**
 * Action to enroll a user in a study path
 *
 * @param studyPathUid - the uid of the study path to enroll in
 */
export const enrollInStudyPath = async (studyPathUid: string) => {
  // get the user
  const user = await getUser();

  // if no user, they cannot enroll in a study path
  if (!user) {
    throw new Error('User not found');
  }

  // check the user level to see if they can enroll in the study path
  // free users can only enroll into 3 study paths
  // premium users can enroll into unlimited study paths
  // if the user is not premium, they can only enroll into 3 study paths
  if (
    user.userLevel === 'FREE' &&
    (user.studyPathEnrollments?.length ?? 0) >= 3
  ) {
    throw new Error('User has reached the maximum number of study paths');
  }

  // check if the user is already enrolled in the study path
  const existingEnrollment = await prisma.userStudyPath.findFirst({
    where: {
      userUid: user.uid,
      studyPathUid: studyPathUid,
    },
  });

  // if the user is already enrolled, return an error
  if (existingEnrollment) {
    throw new Error('User already enrolled in study path');
  }

  // check how many of the questions in the study path have been completed
  // from outside the study path
  const studyPathQuestions = await prisma.studyPath.findUnique({
    where: {
      uid: studyPathUid,
    },
  });

  // from this, we need to get a % of the questions that have been completed
  // from outside the study path
  const completedQuestions = await prisma.answers.findMany({
    where: {
      question: {
        slug: {
          in: studyPathQuestions?.questionSlugs ?? [],
        },
      },
      userUid: user.uid,
    },
  });

  // get the percentage of questions that have been completed
  const percentageCompleted =
    (completedQuestions.length /
      (studyPathQuestions?.questionSlugs?.length ?? 0)) *
    100;

  // create the enrollment
  const enrollment = await prisma.userStudyPath.create({
    data: {
      userUid: user.uid,
      studyPathUid: studyPathUid,
      progress: percentageCompleted,
    },
  });

  // return the enrollment
  return enrollment;
};
