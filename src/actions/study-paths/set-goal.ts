'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';
import { isUserEnrolledInStudyPath } from '@/utils/data/study-paths/get';
import { enrollInStudyPath } from './enroll';

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
      studyPathUid,
      userUid: user.uid,
    },
  });

  if (existingGoal) {
    return {
      success: false,
      error: 'Goal already set',
    };
  }

  // now check if the users is enrolled in the study path
  const existingEnrollment = await isUserEnrolledInStudyPath(studyPathUid);

  // if the user is not enrolled in the study path, enroll them
  if (!existingEnrollment) {
    await enrollInStudyPath(studyPathUid);
  }

  // now set the goal
  await prisma.studyPathGoal.create({
    data: {
      studyPathUid,
      userUid: user.uid,
      dateSet: new Date(),
      targetDate: goal,
      completed: false,
      completedAt: null,
      isActive: true,
    },
  });

  return {
    success: true,
  };
};
