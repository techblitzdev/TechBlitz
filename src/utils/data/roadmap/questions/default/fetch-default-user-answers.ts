import { prisma } from '@/lib/prisma'

export const fetchDefaultUserAnswers = async (opts: { roadmapUid: string }) => {
  const { roadmapUid } = opts

  const answers = await prisma.defaultRoadmapQuestionsUsersAnswers.findMany({
    where: {
      roadmapUid,
    },
    include: {
      question: true,
    },
  })

  return answers
}
