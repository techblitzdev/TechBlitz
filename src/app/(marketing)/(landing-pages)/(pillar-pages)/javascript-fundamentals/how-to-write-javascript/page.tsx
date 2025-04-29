import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

import { ChevronLeft } from 'lucide-react';

import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { createMetadata } from '@/utils/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QUESTIONS_COUNT } from '@/utils/constants/misc';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import ShareThisPost from '@/components/mdx/share-this-post';
import TableOfContents from '@/components/mdx/mdx-table-of-contents';
import { getUserCount } from '@/utils/data/user/get-user-count';

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
  authorImage: string;
  headings: {
    title: string;
    level: number;
  }[];
}

// generate metadata for the blog post
export async function generateMetadata(): Promise<Metadata> {
  try {
    const { frontmatter } = await getBlogPost('how-to-write-javascript');
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
      canonicalUrl: `/javascript-fundamentals/how-to-write-javascript`,
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

export default async function HowToWriteJavascript({ params }: BlogPostParams) {
  try {
    const { content, frontmatter } = await getBlogPost('how-to-write-javascript');
    // typeFrontmatter is the metadata for this blog post
    const typedFrontmatter = frontmatter as unknown as BlogFrontmatter;

    const userCount = await getUserCount().then((count) => Math.round(count / 10) * 10);

    return (
      <div className="container flex flex-col md:flex-row gap-10 max-w-7xl mx-auto pt-32 pb-20">
        <article className="w-full md:w-3/5">
          {/** global hero that displays on all blog posts */}
          <div className="mb-8">
            <Link
              href="/javascript-fundamentals"
              className="flex items-center gap-x-3 hover:text-gray-400 duration-300"
            >
              <ChevronLeft size={16} />
              Back to JavaScript Fundamentals
            </Link>
            <h1 className="text-4xl lg:text-5xl font-medium my-4">{typedFrontmatter.title}</h1>
            <h6 className="mb-2 text-gray-400">{typedFrontmatter.description}</h6>
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
                  <span className="flex items-center gap-x-2">
                    <img
                      src={typedFrontmatter.authorImage}
                      alt={typedFrontmatter.author}
                      className="size-7 rounded-lg"
                    />
                    {typedFrontmatter.author}
                  </span>
                </>
              )}
            </div>
          </div>

          {/** output the mdx content below the hero */}
          <div className="prose prose-invert prose-pre:bg-black-75 prose-pre:border prose-pre:border-black-50 max-w-none mt-10">
            {content}
            <div className="mt-10">
              <CallToActionBlock
                title="Learn to code, faster"
                description={`Join ${userCount}+ developers who are accelerating their coding skills with TechBlitz.`}
              />
            </div>

            {/** share this post */}
            <ShareThisPost title={typedFrontmatter.title} slug={params.slug} />
          </div>
        </article>
        <aside className="w-full md:w-2/5 order-first md:order-last hidden md:block">
          <div className="sticky top-32 md:max-w-[320px] ml-auto space-y-5">
            {typedFrontmatter?.headings?.length > 0 && (
              <div className="hidden md:block">
                <TableOfContents headings={typedFrontmatter.headings} />
              </div>
            )}
            <Card className="w-full border border-black-50 text-white shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="font-onest text-2xl flex items-center justify-center">
                  Try TechBlitz for free
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400 text-xs">
                  Level up your coding skills with our daily challenges, personalized roadmaps,
                  access to {QUESTIONS_COUNT} questions, and a community of like-minded individuals.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="accent" fullWidth href="/signup">
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
