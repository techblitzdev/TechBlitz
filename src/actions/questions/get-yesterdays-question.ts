'use server';
import { Question } from '@/types/Questions';
import { prisma } from '@/utils/prisma';
import { getTagsFromQuestion } from './utils/get-tags-from-question';

export const getYesterdaysQuestion = async (): Promise<Question | null> => {
  try {
    // Get yesterday's date at midnight UTC
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const yesterdayISOString = yesterday.toISOString().split('T')[0];

    // Find a question where `questionDate` is yesterday
    const res = await prisma.questions.findFirst({
      where: {
        questionDate: yesterdayISOString
      },
      include: {
        answers: true,
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    console.log({
      res
    });

    if (!res) {
      console.error('No question found for yesterday');
      return null;
    }

    // Get the tags from the question
    const question = getTagsFromQuestion(res) as unknown as Question;

    return question;
  } catch (error) {
    console.error("Failed to get yesterday's question:", error);
    return null;
  }
};
