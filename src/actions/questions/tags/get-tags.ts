'use server';
import { prisma } from '@/utils/prisma';

export const getTags = async () => {
  const tags = await prisma.tag.findMany();

  // clear out any empty tags
  return tags.filter((tag) => tag.name);
};
