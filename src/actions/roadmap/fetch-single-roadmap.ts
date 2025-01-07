'use server';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';
import { getUser } from '@/actions/user/authed/get-user';

export const fetchRoadmap = async (opts: { roadmapUid: string }) => {
  const user = await getUser();
  if (!user) {
    throw new Error('User not found');
  }

  const { roadmapUid } = opts;

  revalidateTag('roadmap-data');

  return await prisma.userRoadmaps.findUnique({
    where: {
      uid: roadmapUid,
      AND: {
        userUid: user.uid,
      },
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });
};
