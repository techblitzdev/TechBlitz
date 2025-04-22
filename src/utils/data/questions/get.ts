import { prisma } from '@/lib/prisma';
import { getTagsFromQuestion } from './tags/get-tags-from-question';
import { Question } from '@/types/Questions';
import { unstable_cache } from 'next/cache';

/**
 * Retrieve a question via its uid or slug
 *
 * @param identifier - The identifier to use to retrieve the question (uid or slug)
 * @param value - The value of the identifier
 * @returns The question object
 */
export const getQuestion = async (identifier: 'slug' | 'uid' = 'slug', value: string) => {
  // Use unstable_cache with a tag specific to this question value to prevent incorrect caching
  return unstable_cache(
    async () => {
      if (!value) {
        console.error('Please provide a uid or slug');
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
    },
    // Use a unique cache key for each question
    [`question-${identifier}-${value}`],
    // Set revalidation options
    {
      tags: [`question-${value}`],
      revalidate: 3600, // Cache for 1 hour
    }
  )();
};
