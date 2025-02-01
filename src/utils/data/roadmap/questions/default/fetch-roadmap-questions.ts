import { prisma } from '@/lib/prisma'

export const defaultRoadmapQuestionCount = async () => {
  return await prisma.defaultRoadmapQuestions.count()
}
