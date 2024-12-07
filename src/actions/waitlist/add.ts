'use server';
import { prisma } from '@/utils/prisma';

export const addToWaitlist = async (email: string) => {
  if (!email || email.length === 0) {
    throw new Error('Email is required');
  }

  return await prisma.waitlist.create({
    data: {
      email
    }
  });
};
