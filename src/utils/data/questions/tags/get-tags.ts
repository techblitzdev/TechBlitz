import { capitalise } from '@/utils';
import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const getTags = cache(async () => {
  const tags = await prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  // filter out any tags that are empty or duplicates
  // capitalise the name of the tag and remove any duplicates
  const uniqueTags = tags.filter(
    (tag, index, self) =>
      index === self.findIndex((t) => capitalise(t.name) === capitalise(tag.name))
  );

  // clear out any empty tags
  // clear out any empty tags
  return uniqueTags.filter((tag) => tag.name);
});
