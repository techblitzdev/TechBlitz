'use server';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export const getWaitlistCount = async () => {
  revalidateTag('waitlist-count');
  return await prisma.waitlist.count();
};
