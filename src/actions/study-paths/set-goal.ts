'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';
import { getUserStudyPaths, isUserEnrolledInStudyPath } from '@/utils/data/study-paths/get';
import { enrollInStudyPath } from './enroll';
import { UserStudyPath } from '@prisma/client';

export const setUserStudyPathGoal = async (studyPathUid: string, goal: Date) => {
  const user = await getUser();

  // you must be signed in to set a goal
  if (!user) {
    return {
      success: false,
      error: 'You must be signed in to set a goal',
    };
  }

  // check if the user has already set a goal for this study path
  const existingGoal = await prisma.studyPathGoal.findFirst({
    where: {
      userUid: user.uid,
      studyPathUid: studyPathUid,
      AND: {
        completed: false,
      },
    },
  });

  if (existingGoal) {
    return {
      success: false,
      error: 'You already have a goal set. Complete it before setting a new one.',
    };
  }

  // now check if the users is enrolled in the study path
  let existingEnrollment = await isUserEnrolledInStudyPath(studyPathUid);

  // if the user is not enrolled in the study path, enroll them
  if (!existingEnrollment) {
    existingEnrollment = await enrollInStudyPath(studyPathUid);
  }

  // now set the goal
  await prisma.studyPathGoal.create({
    data: {
      dateSet: new Date(),
      targetDate: goal,
      completed: false,
      completedAt: null,
      isActive: true,
      userUid: user.uid,
      studyPathUid: studyPathUid,
      userStudyPathUid: existingEnrollment?.uid,
    },
  });

  return {
    success: true,
  };
};
