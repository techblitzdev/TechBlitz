'use server';
import { prisma } from '@/utils/prisma';

export const getUserCount = async () => {
  const userCount = await prisma.users.count();
  return userCount;
};
