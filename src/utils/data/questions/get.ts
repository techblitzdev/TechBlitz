import { prisma } from '@/lib/prisma';
import { getTagsFromQuestion } from './tags/get-tags-from-question';
import { Question } from '@/types/Questions';
import { cache } from 'react';

/**
 * Retrieve a question via its uid or slug
 *
 * @param identifier - The identifier to use to retrieve the question (uid or slug)
 * @param value - The value of the identifier
 * @returns The question object
 */
export const getQuestion = cache(async (identifier: 'slug' | 'uid' = 'slug', value: string) => {
  if (!value) {
    console.error('Please provide a uid');
    return null;
  }

  let res = await prisma.questions.findUnique({
    where: identifier === 'uid' ? { uid: value } : { slug: value },
    include: {
      answers: true,
      tags: {
        include: {
          tag: true,
        },
      },
      QuestionResources: true,
      bookmarks: true,
    },
  });

  // If not found, try the other identifier
  if (!res) {
    res = await prisma.questions.findUnique({
      where: identifier === 'uid' ? { slug: value } : { uid: value },
      include: {
        answers: true,
        tags: {
          include: {
            tag: true,
          },
        },
        QuestionResources: true,
        bookmarks: true,
      },
    });
  }

  if (!res) {
    return null;
  }

  // get the tags from out the question
  const question = getTagsFromQuestion(res) as unknown as Question;

  return question;
});
