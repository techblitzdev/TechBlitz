import fs from 'fs';
import path from 'path';
import { processMDX } from '../mdx';

const POSTS_PATH = path.join(process.cwd(), 'src/app/(marketing)/blog/posts');

export const getBlogPosts = async () => {
  try {
    // Don't try to create directory, just check if it exists
    if (!fs.existsSync(POSTS_PATH)) {
      console.warn('Blog posts directory does not exist');
      return [];
    }

    const files = fs.readdirSync(POSTS_PATH);

    if (files.length === 0) {
      return [];
    }

    const posts = await Promise.all(
      files
        .filter((filename) => filename.endsWith('.mdx'))
        .map(async (filename) => {
          try {
            const filePath = path.join(POSTS_PATH, filename);
            const content = fs.readFileSync(filePath, 'utf8');
            const { content: _, frontmatter } = await processMDX(content);

            return {
              slug: filename.replace('.mdx', ''),
              date: frontmatter.date,
              ...frontmatter,
            };
          } catch (error) {
            console.error(`Error processing ${filename}:`, error);
            return null;
          }
        })
    );

    // Filter out any null results from errors
    const validPosts = posts.filter(
      (post): post is NonNullable<typeof post> => post !== null
    );
    return validPosts.sort((a, b) => {
      const dateA = new Date(a.date as string);
      const dateB = new Date(b.date as string);
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    });
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
};

export const getBlogPost = async (slug: string) => {
  try {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Blog post not found: ${slug}`);
    }

    const content = fs.readFileSync(filePath, 'utf8');
    return processMDX(content);
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    throw error;
  }
};
