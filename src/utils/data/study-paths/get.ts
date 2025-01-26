import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

/**
 * Get a study path by its slug
 * @param slug - The slug of the study path
 * @returns The study path
 */
export const getStudyPath = async (slug: string) => {
  return await prisma.studyPath.findUnique({
    where: {
      slug,
    },
  });
};

/**
 * Check if a user is enrolled in a study path
 * @param studyPathUid - The uid of the study path
 * @returns Whether the user is enrolled in the study path
 */
export const isUserEnrolledInStudyPath = async (studyPathUid: string) => {
  console.log({
    studyPathUid,
  });

  const user = await getUser();

  const studyPath = await prisma.studyPath.findUnique({
    where: {
      uid: studyPathUid,
    },
  });

  if (!user || !studyPath) return false;

  return user?.studyPathEnrollments?.some(
    (enrollment) => enrollment.studyPathUid === studyPath.uid
  );
};
