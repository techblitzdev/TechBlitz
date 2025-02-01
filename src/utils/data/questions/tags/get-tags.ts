import { capitalise } from '@/utils'
import { prisma } from '@/lib/prisma'

export const getTags = async () => {
  const tags = await prisma.tag.findMany()

  // order the tags in alphabetical order
  const sortedTags = tags.sort((a, b) => a.name.localeCompare(b.name))

  // filter out any tags that are empty or duplicates
  // capitalise the name of the tag and remove any duplicates
  const uniqueTags = sortedTags.filter(
    (tag, index, self) =>
      index ===
      self.findIndex((t) => capitalise(t.name) === capitalise(tag.name)),
  )

  // clear out any empty tags
  // clear out any empty tags
  return uniqueTags.filter((tag) => tag.name)
}
