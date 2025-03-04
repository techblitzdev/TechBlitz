'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';
import { isUserEnrolledInStudyPath } from '@/utils/data/study-paths/get';
import { enrollInStudyPath } from './enroll';

export const setUserStudyPathGoal = async (studyPathUid: string, goal: number) => {
  const user = await getUser();

  // you must be signed in to set a goal
  if (!user) {
    throw new Error('User not found');
  }

  // now check if the users is enrolled in the study path
  const existingEnrollment = await isUserEnrolledInStudyPath(studyPathUid);

  // if the user is not enrolled in the study path, enroll them
  if (!existingEnrollment) {
    await enrollInStudyPath(studyPathUid);
  }

  // now set the goal
};
