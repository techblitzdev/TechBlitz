'use server';
import { prisma } from '@/utils/prisma';

export const createOrFetchUserRoadmap = async (opts: { userUid: string }) => {
  const { userUid } = opts;

  try {
    // Check if the user exists
    const userExists = await prisma.users.findUnique({
      where: { uid: userUid },
    });

    if (!userExists) {
      throw new Error('User does not exist');
    }

    // check if the user already has a roadmap that has not been completed
    const existingUserRoadmap = await prisma.userRoadmaps.findFirst({
      where: {
        userUid,
        status: 'ACTIVE',
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
