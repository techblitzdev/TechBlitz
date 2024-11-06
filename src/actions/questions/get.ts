'use server';
import { prisma } from '@/utils/prisma';
import { getTagsFromQuestion } from '../utils/get-tags-from-question';
import { Question } from '@/types/Questions';

export const getQuestion = async (uid: string) => {
  if (!uid) {
    console.error('Please provide a uid');
    return null;
  }

  try {
    const res = await prisma.questions.findUnique({
      where: {
        uid,
      },
      include: {
        answers: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!res) {
      console.error('Question not found');
      return null;
    }

    // get the tags from out the question
    const question = getTagsFromQuestion(res) as unknown as Question;

    return question;
  } catch (e) {
    console.error('Error getting question', e);
    return null;
  }
};
