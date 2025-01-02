'use server';

import { prisma } from '@/utils/prisma';
import type { Tag } from '@prisma/client';

export const getTags = async (): Promise<Tag[]> => {
  const tags = await prisma.tag.findMany();

  // order the tags in alphabetical order
  const sortedTags = tags.sort((a: Tag, b: Tag) => a.name.localeCompare(b.name));

  return sortedTags;
};
