import { getBlogPosts, getAllUniqueTags, filterPostsByTags } from '@/lib/blog';

import { Button } from '@/components/ui/button';
import BlogCard from '@/components/marketing/resources/blog/blog-card';
import { createMetadata } from '@/utils/seo';
import TagFilter from '@/components/marketing/blog/tag-filter';
import FeaturedPost from '@/components/marketing/blog/featured-post';
import { WebPageJsonLd } from '@/types/Seo';
import { getBaseUrl } from '@/utils';

interface BlogPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata() {
  return createMetadata({
    title: 'Blog | TechBlitz',
    description:
      'Stay up to date with the latest news and insights from TechBlitz. Gather insights on how to level up your skills, beyond our coding challenges.',
    image: {
      text: 'Blog | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/blog',
  });
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = await getBlogPosts();
  const allTags = getAllUniqueTags(posts);

  const selectedTags = (searchParams.tags as string)?.split(',').filter(Boolean) || [];
  const featuredPost = posts.find((post) => post.featured);

  // do not include featured post in filtered posts
  const filteredPosts = filterPostsByTags(
    posts.filter((post) => !post.featured && !post.subpage),
    selectedTags
  );

  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/blog`,
    headline: 'Blog | TechBlitz',
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
        <section className="pt-32 pb-36 relative">
          {featuredPost && (
            <FeaturedPost
              title={featuredPost.title}
              description={featuredPost.description}
              image={featuredPost.image}
              link={`/blog/${featuredPost.slug}`}
              className="my-20"
            />
          )}

          <TagFilter
            className="max-w-2xl justify-self-center "
            tags={allTags}
            selectedTags={selectedTags}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {filteredPosts.length === 0 && (
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

            {filteredPosts.map((post: any) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
