import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';
import { QuestionDifficulty, QuestionType } from '@/types/Questions';

/**
 * Method for getting questions by difficulty or tag.
 * If no difficulty or tag is provided, returns all questions.
 *
 * @param tag - optional tag or array of tags to filter by
 * @param difficulty - optional difficulty level to filter by
 * @returns - the questions
 */
export const getQuestionsByTag = async (
  tag?: string | string[],
  difficulty?: QuestionDifficulty | undefined,
  take?: number,
  questionType?: QuestionType
) => {
  const user = await getUser();
  const includeUserAnswers = user ? true : false;

  // Get questions filtered by difficulty and/or tags
  const questions = await prisma.questions.findMany({
    where: {
      slugGenerated: true,
      customQuestion: false,
      ...(difficulty && { difficulty }),
      ...(questionType && { questionType: questionType }),
      ...(tag &&
        tag.length > 0 && {
          tags: {
            some: {
              tag: {
                name: typeof tag === 'string' ? tag : { in: tag }
              }
            }
          }
        })
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      },
      userAnswers: includeUserAnswers
        ? {
            where: {
              userUid: user?.uid
            }
          }
        : undefined
    },
    take: take ?? 10
  });

  // If no tag provided, return questions grouped under a null tag
  if (!tag || (Array.isArray(tag) && tag.length === 0)) {
    return [
      {
        name: null,
        questions: questions.map((q) => ({
          question: {
            ...q,
            tags: q.tags,
            userAnswers: q.userAnswers
          }
        }))
      }
    ];
  }

  // Otherwise structure response by tags
  const tags = await prisma.tag.findMany({
    where: {
      name: typeof tag === 'string' ? tag : { in: tag }
    },
    include: {
      questions: {
        where: {
          questionId: {
            in: questions.map((q) => q.uid)
          }
        },
        include: {
          question: {
            include: {
              tags: {
                include: {
                  tag: true
                }
              },
              userAnswers: includeUserAnswers
                ? {
                    where: {
                      userUid: user?.uid
                    }
                  }
                : undefined
            }
          }
        }
      }
    }
  });

  return tags;
};
