import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

import { ChevronLeft, Rocket, Star } from 'lucide-react';

import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { createMetadata } from '@/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
      <div className="container flex gap-10 mx-64 pt-32 pb-20">
        <article className="w-full md:w-3/5">
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
        <aside className="relative w-full md:w-2/5">
          <div className="order-first md:order-last sticky top-32 space-y-5 w-3/5">
            <Card className="w-full border border-black-50 text-white shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="font-onest text-2xl flex items-center justify-center">
                  Try TechBlitz for free
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400 text-xs">
                  Level up your coding skills with our daily challenges,
                  personalized roadmaps, access to 1000+ questions, and a
                  community of like-minded individuals.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" fullWidth href="/signup">
                  Get Started Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </aside>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
