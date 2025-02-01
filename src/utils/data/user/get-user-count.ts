import { prisma } from '@/lib/prisma';

export const getUserCount = async () => {
  const userCount = await prisma.users.count();
  return userCount;
};
