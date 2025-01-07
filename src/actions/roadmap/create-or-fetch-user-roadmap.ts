'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';

export const createOrFetchUserRoadmap = async () => {
  const user = await getUser();
  const userUid = user?.uid;

  if (!userUid) {
    throw new Error('User does not exist');
  }

  try {
    // check if the user has more than 10 roadmaps
    const userRoadmapsCount = await prisma.userRoadmaps.count({
      where: { userUid },
    });

    if (userRoadmapsCount >= 10) {
      throw new Error('Maximum number of roadmaps (10) reached');
    }

    // check if the user already has a roadmap that has not been completed
    const existingUserRoadmap = await prisma.userRoadmaps.findFirst({
      where: {
        userUid,
        status: 'CREATING',
      },
    });

    if (existingUserRoadmap) {
      return existingUserRoadmap;
    }

    // Create a new roadmap for the user
    return await prisma.userRoadmaps.create({
      data: {
        userUid,
        status: 'CREATING',
      },
    });
  } catch (error) {
    console.error('Error creating user roadmap:', error);
    throw new Error('Failed to create user roadmap. Please try again.');
  }
};
