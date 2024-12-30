import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

import { ChevronLeft } from 'lucide-react';

import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { createMetadata } from '@/utils';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: number;
}

// generate metadata for the blog post
export async function generateMetadata({
  params,
}: BlogPostParams): Promise<Metadata> {
  try {
    const { frontmatter } = await getBlogPost(params.slug);
    const typedFrontmatter = frontmatter as unknown as BlogFrontmatter;

    // generate the metadata for the blog post
    return createMetadata({
      title: `${typedFrontmatter.title} | TechBlitz Blog`,
      description: typedFrontmatter.description,
      keywords: ['blog', 'article', typedFrontmatter.title.toLowerCase()],
      image: {
        text: typedFrontmatter.title,
        bgColor: '#000',
        textColor: '#fff',
      },
    });
  } catch {
    return {
      title: 'Blog Post Not Found',
    };
  }
}

// generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: BlogPostParams) {
  try {
    const { content, frontmatter } = await getBlogPost(params.slug);
    // typeFrontmatter is the metadata for this blog post
    const typedFrontmatter = frontmatter as unknown as BlogFrontmatter;

    return (
      <div className="container">
        <article className="max-w-3xl mx-auto pt-32 pb-20">
          {/** global hero that displays on all blog posts */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="flex items-center gap-x-3 hover:text-gray-400 duration-300"
            >
              <ChevronLeft size={16} />
              Back to blog
            </Link>
            <h1 className="text-4xl lg:text-5xl font-medium my-4">
              {typedFrontmatter.title}
            </h1>
            <h6 className="mb-2 text-gray-400">
              {typedFrontmatter.description}
            </h6>
            <div className="flex items-center gap-x-4 text-gray-400 text-sm">
              <time dateTime={typedFrontmatter.date}>
                {new Date(typedFrontmatter.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{typedFrontmatter.readingTime} min read</span>
              {typedFrontmatter.author && (
                <>
                  <span>•</span>
                  <span>{typedFrontmatter.author}</span>
                </>
              )}
            </div>
          </div>

          {/** output the mdx content below the hero */}
          <div className="prose prose-invert prose-pre:bg-black-75 prose-pre:border prose-pre:border-black-50 max-w-none mt-10">
            {content}
          </div>
        </article>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
