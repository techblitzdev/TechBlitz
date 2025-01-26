import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

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
  // Run these queries in parallel
  const [user, studyPath] = await Promise.all([
    getUser(),
    prisma.studyPath.findUnique({
      where: { uid: studyPathUid },
      select: { uid: true, slug: true }, // Only select needed fields
    }),
  ]);

  if (!user || !studyPath) return false;

  revalidateTag(`study-path-${studyPath.slug}`);

  // Check enrollment directly from prisma instead of filtering in memory
  const enrollment = await prisma.userStudyPath.findUnique({
    where: {
      userUid_studyPathUid: {
        userUid: user.uid,
        studyPathUid: studyPath.uid,
      },
    },
  });

  return !!enrollment;
};
