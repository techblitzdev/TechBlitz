'use server'
import { prisma } from '@/lib/prisma'
import { revalidateTag } from 'next/cache'
import { getUser } from '@/actions/user/authed/get-user'

export const deleteRoadmap = async (roadmapUid: string) => {
  // get the current user
  const user = await getUser()

  if (!user) {
    throw new Error('User not found')
  }

  const roadmap = await prisma.userRoadmaps.delete({
    where: {
      uid: roadmapUid,
      AND: {
        userUid: user.uid,
      },
    },
  })

  revalidateTag('roadmaps')

  return roadmap
}
