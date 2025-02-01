'use server'
import { prisma } from '@/lib/prisma'
import { getUser } from './get-user'

export async function checkUsername(username: string): Promise<boolean> {
  // get the current user
  const currentUser = await getUser()

  if (!currentUser) return false

  const user = await prisma.users.findFirst({
    where: {
      username,
    },
  })

  // check if the current user is the same as the user we are checking
  if (currentUser.uid === user?.uid) return true

  return !Boolean(user)
}
