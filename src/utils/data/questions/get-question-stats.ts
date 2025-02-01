import { prisma } from '@/lib/prisma'

/**
 * Method to get the stats for a question.
 *
 * This will return the:
 * - number of submissions
 * - number of correct submissions
 * - percentage of correct submissions
 *
 * @param questionSlug
 * @returns
 */
export const getQuestionStats = async (
  identifier: 'slug' | 'uid',
  value: string,
) => {
  const whereClause = identifier === 'slug' ? { slug: value } : { uid: value }

  const totalSubmissions = await prisma.answers.count({
    where: {
      question: whereClause,
    },
  })

  const totalCorrectSubmissions = await prisma.answers.count({
    where: {
      question: whereClause,
      correctAnswer: true,
    },
  })

  const percentageCorrect = Math.round(
    (totalCorrectSubmissions / totalSubmissions) * 100 || 0,
  )

  return {
    totalSubmissions,
    totalCorrectSubmissions,
    percentageCorrect,
  }
}
