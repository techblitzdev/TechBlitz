import { prisma } from '@/lib/prisma';

export const getMostQuestionsAnswered = async (take: number = 30, page: number = 1) => {
  const skip = (page - 1) * take;

  const [users, totalCount] = await Promise.all([
    prisma.users.findMany({
      take,
      skip,
      orderBy: {
        userXp: 'desc', // Order by user XP in descending order
      },
      // ensure we only get users who have answered at least one question
      where: {
        answers: {
          some: {},
        },
        showTimeTaken: true,
        userXp: {
          gt: 0, // Only include users with XP greater than 0
        },
      },
      select: {
        uid: true,
        username: true,
        email: true,
        answers: true,
        userProfilePicture: true,
        userXp: true, // Include userXp in the selection
        _count: {
          select: { answers: true },
        },
        userLevel: true,
      },
    }),
    // Get total count for pagination
    prisma.users.count({
      where: {
        answers: {
          some: {},
        },
        showTimeTaken: true,
      },
    }),
  ]);

  return {
    users,
    totalCount,
  };
};
