import fs from 'fs';
import path from 'path';
import { processMDX } from '../mdx';

const POSTS_PATH = path.join(process.cwd(), 'src/app/(marketing)/blog/content');

export async function getBlogPosts() {
  // Create directory if it doesn't exist
  if (!fs.existsSync(POSTS_PATH)) {
    fs.mkdirSync(POSTS_PATH, { recursive: true });
    return []; // Return empty array if no posts exist yet
  }

  const files = fs.readdirSync(POSTS_PATH);

  if (files.length === 0) {
    return []; // Return empty array if no posts exist yet
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
          ...frontmatter,
        };
      })
  );

  return posts.sort((a: any, b: any) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

export async function getBlogPost(slug: string) {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return processMDX(content);
}
