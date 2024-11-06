'use server';
import { prisma } from '@/utils/prisma';

export const getTags = async () => {
  return prisma.tag.findMany();
};
