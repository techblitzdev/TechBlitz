'use server';
import { Question } from '@/types/Questions';
import { prisma } from '@/utils/prisma';
import { getTagsFromQuestion } from './utils/get-tags-from-question';

export const getTodaysQuestion = async (): Promise<Question | null> => {
  try {
    // Get the current date at 00:00:00 and the end of the day 23:59:59
    const todayStart = new Date().toISOString().split('T')[0];

    // Find a question where `questionDate` is today
    const res = await prisma.questions.findFirst({
      where: {
        questionDate: todayStart
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

    if (!res) {
      console.error('Question not found');
      return null;
    }

    // get the tags from out the question
    const question = getTagsFromQuestion(res) as unknown as Question;

    return question;
  } catch (error) {
    console.error("Failed to get today's question:", error);
    return null;
  }
};
