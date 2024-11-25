'use server';
import { prisma } from '@/utils/prisma';

export const addToWaitlist = async (email: string) => {
  return await prisma.waitlist.create({
    data: {
      email,
    },
  });
};
