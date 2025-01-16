import fs from 'fs';
import path from 'path';
import { processMDX } from '../mdx';

const POSTS_PATH = path.join(process.cwd(), 'src/app/(marketing)/blog/posts');

export const getBlogPosts = async () => {
  console.log({
    POSTS_PATH,
  });
  // create directory if it doesn't exist
  if (!fs.existsSync(POSTS_PATH)) {
    console.log('Creating blog posts directory');
    fs.mkdirSync(POSTS_PATH, { recursive: true });
    // return empty array if no posts exist yet
    return [];
  }

  const files = fs.readdirSync(POSTS_PATH);

  // return empty array if no posts exist yet
  if (files.length === 0) {
    return [];
  }

  const posts = await Promise.all(
    files
      .filter((filename) => filename.endsWith('.mdx'))
      .map(async (filename) => {
        const filePath = path.join(POSTS_PATH, filename);
        const content = fs.readFileSync(filePath, 'utf8');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { content: _, frontmatter } = await processMDX(content);

        return {
          slug: filename.replace('.mdx', ''),
          date: frontmatter.date,
          ...frontmatter,
        };
      })
  );

  // remove any posts that status is 'unpublished' if we are on the production environment
  if (process.env.NODE_ENV === 'production') {
    return posts.filter((post: any) => post.status !== 'unpublished');
  }

  return posts.sort((a: any, b: any) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
};

export const getBlogPost = async (slug: string) => {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return processMDX(content);
};
