'use server';
import { prisma } from '@/lib/prisma';

export const checkIfUserIsOnCorrectQuestionIndex = async (opts: {
  userUid: string;
  currentQuestionIndex: number;
  roadmapUid: string;
}) => {
  const { userUid, currentQuestionIndex, roadmapUid } = opts;

  // convert the currentQuestionIndex to a number
  const index = Number(currentQuestionIndex);

  // Retrieve the user's roadmap progress
  const userRoadmap = await prisma.userRoadmaps.findFirst({
    where: {
      userUid,
      uid: roadmapUid,
    },
  });

  // If no roadmap exists, return false to signal an error state
  if (!userRoadmap) {
    return false;
  }

  // Ensure `currentQuestionIndex` matches the roadmap's `currentQuestionIndex`
  if (userRoadmap.currentQuestionIndex !== index) {
    return userRoadmap.currentQuestionIndex; // Return the expected index to redirect
  }

  return true; // The user is on the correct question
};
