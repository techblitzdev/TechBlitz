import { prisma } from '@/lib/prisma'
import { fetchRoadmapQuestion } from './fetch-roadmap-question'
import { getUser } from '@/actions/user/authed/get-user'
import { fetchRoadmap } from '../fetch-single-roadmap'

export const fetchNextPrevRoadmapQuestion = async (opts: {
  roadmapUid: string
  questionUid: string
}) => {
  const { roadmapUid, questionUid } = opts

  const user = await getUser()
  if (!user) {
    throw new Error('User not found')
  }

  const roadmap = await fetchRoadmap({ roadmapUid })
  if (!roadmap) {
    throw new Error('Roadmap not found')
  }

  const question = await fetchRoadmapQuestion(questionUid)
  if (!question) {
    throw new Error('Question not found')
  }

  const nextQuestion = await prisma.roadmapUserQuestions.findFirst({
    where: {
      roadmapUid: roadmap.uid,
      order: question.order + 1,
    },
  })

  const prevQuestion = await prisma.roadmapUserQuestions.findFirst({
    where: {
      roadmapUid: roadmap.uid,
      order: question.order - 1,
    },
  })

  return { nextQuestion, prevQuestion, roadmap }
}
