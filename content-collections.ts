import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';

const posts = defineCollection({
  name: 'posts',
  directory: 'src/app/(marketing)/blog/posts',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
  }),
  parser: 'frontmatter',
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
