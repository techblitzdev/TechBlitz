'use server';
import { Question } from '@/types/Questions';
import { prisma } from '@/utils/prisma';

export const getTodaysQuestion = async (): Promise<Question | null> => {
  try {
    // Get the current date at 00:00:00 and the end of the day 23:59:59
    const todayStart = new Date();
    // Start of the day
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    // End of the day
    todayEnd.setHours(23, 59, 59, 999);

    // Find a question where `questionDate` is between the start and end of today
    return await prisma.questions.findFirst({
      where: {
        questionDate: {
          // Greater than or equal to the start of today
          gte: todayStart,
          // Less than or equal to the end of today
          lte: todayEnd,
        },
      },
      include: {
        answers: true,
      },
    });
  } catch (error) {
    console.error("Failed to get today's question:", error);
    return null;
  }
};
