'use server';
import { prisma } from '@/utils/prisma';

export const getMostQuestionsAnswered = async () => {
  return await prisma.users.findMany({
    take: 20,
    orderBy: {
      answers: {
        _count: 'desc', // Order by the count of related answers in descending order
      },
    },
    // ensure we only get users who have answered at least one question
    where: {
      answers: {
        some: {},
      },
    },
    select: {
      uid: true,
      username: true,
      email: true,
      answers: true,
      userProfilePicture: true,
      _count: {
        select: { answers: true }, // Count on actual references
      },
    },
  });
};
