import { getBlogPosts, getAllUniqueTags, filterPostsByTags } from '@/lib/blog';

import { Button } from '@/components/ui/button';
import BlogCard from '@/components/marketing/resources/blog/blog-card';
import { createMetadata } from '@/utils/seo';
import TagFilter from '@/components/marketing/blog/tag-filter';
import FeaturedPost from '@/components/marketing/blog/featured-post';
import type { WebPageJsonLd } from '@/types';
import { getBaseUrl } from '@/utils';
import Link from 'next/link';

const POSTS_PER_PAGE = 12;

interface BlogPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ searchParams }: BlogPageProps) {
  const page = Number(searchParams.page) || 1;
  const pageTitle = page === 1 ? 'Blog | TechBlitz' : `Blog - Page ${page} | TechBlitz`;

  return createMetadata({
    title: pageTitle,
    description:
      'Stay up to date with the latest news and insights from TechBlitz. Gather insights on how to level up your skills, beyond our coding challenges.',
    image: {
      text: pageTitle,
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: page === 1 ? '/blog' : `/blog/page/${page}`,
  });
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = await getBlogPosts();
  const allTags = getAllUniqueTags(posts);

  const selectedTags = (searchParams.tags as string)?.split(',').filter(Boolean) || [];
  const featuredPost = posts.find((post) => post.featured);
  const currentPage = Number(searchParams.page) || 1;

  // do not include featured post in filtered posts
  const filteredPosts = filterPostsByTags(
    posts.filter((post) => !post.featured && !post.subpage),
    selectedTags
  );

  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}${currentPage === 1 ? '/blog' : `/blog/page/${currentPage}`}`,
    headline: currentPage === 1 ? 'Blog | TechBlitz' : `Blog - Page ${currentPage} | TechBlitz`,
    description:
      'Stay up to date with the latest news and insights from TechBlitz. Gather insights on how to level up your skills, beyond our coding challenges.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${getBaseUrl()}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${getBaseUrl()}/blog`,
        },
        ...(currentPage > 1
          ? [
              {
                '@type': 'ListItem' as const,
                position: 3,
                name: `Page ${currentPage}`,
                item: `${getBaseUrl()}/blog/page/${currentPage}`,
              },
            ]
          : []),
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="pt-32 flex flex-col gap-y-4">
          <h1 className="text-4xl lg:text-6xl font-bold text-gradient from-white/75 to-white py-1">
            Blog
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Stay up to date with the latest news and insights from TechBlitz. Gather insights on how
            to level up your skills, beyond our coding challenges.
          </p>

          <TagFilter className="max-w-2xl pt-4" tags={allTags} selectedTags={selectedTags} />
        </div>
        <section className="pt-20 pb-36 relative">
          {featuredPost && (
            <FeaturedPost
              title={featuredPost.title}
              description={featuredPost.description}
              image={featuredPost.image}
              link={`/blog/${featuredPost.slug}`}
              className="my-20"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {paginatedPosts.length === 0 && (
              <div className="col-span-full flex flex-col gap-y-4 items-center">
                <p className="text-center">
                  It look's like there are no blog posts posted at the moment. <br /> Why not try
                  out today's challenge instead?
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button href="/">Homepage</Button>
                  <Button href="/daily-challenge" variant="secondary">
                    Daily challenge
                  </Button>
                </div>
              </div>
            )}

            {paginatedPosts.map((post: any) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              {currentPage > 1 && (
                <Link
                  href={{
                    pathname: currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`,
                    query: selectedTags.length ? { tags: selectedTags.join(',') } : undefined,
                  }}
                  className="px-4 py-2 border border-black-50 rounded-lg hover:border-accent transition-colors"
                >
                  Previous
                </Link>
              )}
              <span className="text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link
                  href={{
                    pathname: `/blog/page/${currentPage + 1}`,
                    query: selectedTags.length ? { tags: selectedTags.join(',') } : undefined,
                  }}
                  className="px-4 py-2 border border-black-50 rounded-lg hover:border-accent transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
