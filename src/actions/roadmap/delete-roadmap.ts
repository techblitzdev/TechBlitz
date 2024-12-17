'use server';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';
import { getUserFromSession } from '../user/authed/get-user';

export const deleteRoadmap = async (roadmapUid: string) => {
  // get the current user
  const user = await getUserFromSession();

  if (!user) {
    throw new Error('User not found');
  }

  const userUid = user.data.user?.id;

  const roadmap = await prisma.userRoadmaps.delete({
    where: {
      uid: roadmapUid,
      AND: {
        userUid
      }
    }
  });

  revalidateTag('roadmaps');

  return roadmap;
};
