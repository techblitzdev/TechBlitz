import type React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QUESTIONS_COUNT } from '@/utils/constants/misc';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import ShareThisPost from '@/components/mdx/share-this-post';
import TableOfContents from '@/components/mdx/mdx-table-of-contents';

interface BlogPostLayoutProps {
  frontmatter: {
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
  };
  content: React.ReactNode;
  slug: string;
  userCount: number;
  backLink: {
    href: string;
    text: string;
  };
}

export default function BlogPostLayout({
  frontmatter,
  content,
  slug,
  userCount,
  backLink,
}: BlogPostLayoutProps) {
  return (
    <div className="container flex flex-col md:flex-row gap-10 max-w-7xl mx-auto pt-32 pb-20">
      <article className="w-full md:w-3/5">
        <div className="mb-8">
          <Link
            href={backLink.href}
            className="flex items-center gap-x-3 hover:text-gray-400 duration-300"
          >
            <ChevronLeft size={16} />
            {backLink.text}
          </Link>
          <h1 className="text-4xl lg:text-5xl font-medium my-4">{frontmatter.title}</h1>
          <h6 className="mb-2 text-gray-400">{frontmatter.description}</h6>
          <div className="flex items-center gap-x-4 text-gray-400 text-sm">
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{frontmatter.readingTime} min read</span>
            {frontmatter.author && (
              <>
                <span>•</span>
                <span className="flex items-center gap-x-2">
                  <img
                    src={frontmatter.authorImage || '/placeholder.svg'}
                    alt={frontmatter.author}
                    className="size-7 rounded-lg"
                  />
                  {frontmatter.author}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="prose prose-invert prose-pre:bg-black-75 prose-pre:border prose-pre:border-black-50 max-w-none mt-10">
          {content}
          <div className="mt-10">
            <CallToActionBlock
              title="Land your dream tech job faster"
              description={`Join ${userCount}+ developers who are accelerating their coding skills with TechBlitz.`}
            />
          </div>

          <ShareThisPost title={frontmatter.title} slug={slug} />
        </div>
      </article>
      <aside className="w-full md:w-2/5 order-first md:order-last hidden md:block">
        <div className="sticky top-32 md:max-w-[320px] ml-auto space-y-5">
          {frontmatter.headings.length > 0 && (
            <div className="hidden md:block">
              <TableOfContents headings={frontmatter.headings} />
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
                Level up your coding skills with our daily challenges, personalized roadmaps, access
                to {QUESTIONS_COUNT} questions, and a community of like-minded individuals.
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
}
