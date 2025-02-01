'use server'
import { prisma } from '@/lib/prisma'

export const addUidAsUsername = async () => {
  const users = await prisma.users.findMany({
    where: {
      username: null,
      AND: {
        isCustomUsername: false,
      },
    },
  })

  for (const user of users) {
    await prisma.users.update({
      where: { uid: user.uid },
      data: { username: user.uid },
    })
  }
}
