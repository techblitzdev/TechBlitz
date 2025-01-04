'use server';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';
import { getUser } from '@/actions/user/authed/get-user';

export const updateRoadmapDetails = async (
  roadmapUid: string,
  data: {
    title: string;
    description: string;
  }
) => {
  const user = await getUser();
  if (!user) {
    throw new Error('User not found');
  }

  const roadmap = await prisma.userRoadmaps.update({
    where: {
      uid: roadmapUid,
      AND: {
        userUid: user.uid,
      },
    },
    data,
  });

  revalidateTag('roadmap-data');

  return roadmap;
};
