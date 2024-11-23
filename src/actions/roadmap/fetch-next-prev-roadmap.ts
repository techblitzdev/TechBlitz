'use server';
import { prisma } from '@/utils/prisma';
import { fetchUserRoadmaps } from './fetch-user-roadmaps';

export const fetchNextPrevRoadmap = async (opts: {
  roadmapUid: string;
  userUid: string;
}) => {
  const { roadmapUid, userUid } = opts;

  const userRoadmaps = await fetchUserRoadmaps(userUid);

  const roadmapIndex = userRoadmaps.findIndex(
    (roadmap) => roadmap.uid === roadmapUid
  );

  if (roadmapIndex === -1) {
    return {
      nextRoadmap: null,
      prevRoadmap: null,
    };
  }

  return {
    nextRoadmapUid: userRoadmaps[roadmapIndex + 1]?.uid || null,
    prevRoadmapUid: userRoadmaps[roadmapIndex - 1]?.uid || null,
  };
};
