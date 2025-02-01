import { getUser } from '@/actions/user/authed/get-user'
import { prisma } from '@/lib/prisma'

type GetQuestionsOpts = { questionSlugs: string[] }

export const getQuestions = async (opts: GetQuestionsOpts) => {
  const user = await getUser()
  const { questionSlugs } = opts

  const res = await prisma.questions.findMany({
    where: {
      slug: {
        in: questionSlugs,
      },
    },
    include: {
      answers: true,
      tags: {
        include: {
          tag: true,
        },
      },
      userAnswers: {
        where: {
          userUid: user?.uid,
        },
      },
    },
  })

  // current date
  return res
}
