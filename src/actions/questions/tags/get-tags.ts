'use server';
import { prisma } from '@/utils/prisma';

export const getTags = async () => {
  const tags = await prisma.tag.findMany();

  // return a random 20 tags
  const randomTags = tags.sort(() => Math.random() - 0.5).slice(0, 20);

  // order the tags in alphabetical order
  randomTags.sort((a, b) => a.name.localeCompare(b.name));

  // clear out any empty tags
  return randomTags.filter((tag) => tag.name);
};
