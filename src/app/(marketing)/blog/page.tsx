import { cn } from '@/lib/utils';
import { getBlogPosts } from '@/lib/blog';

import GridPattern from '@/components/ui/grid-pattern';
import { Button } from '@/components/ui/button';
import BlogCard from '@/components/marketing/resources/blog/blog-card';
import { createMetadata } from '@/utils';

export const metadata = createMetadata({
  title: 'Blog | TechBlitz',
  description:
    'Stay up to date with the latest news and insights from TechBlitz. Gather insights on how to level up your skills, beyond our coding challenges.',
  image: {
    text: 'Blog | TechBlitz',
    bgColor: '#000',
    textColor: '#fff',
  },
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container">
      <section className="pt-32 lg:pt-52 pb-36 relative">
        <div className="mt-28 z-10 absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#000] to-transparent pointer-events-none"></div>

        <div className="flex flex-col gap-y-3 z-20 relative items-center">
          <h1 className="text-center text-5xl lg:text-7xl !font-onest !font-medium tracking-tight text-gradient from-white to-white/75 py-1.5">
            Blog
          </h1>
          <p className="text-gray-400 max-w-xl text-sm md:text-base font-onest text-center">
            Stay up to date with the latest news and insights from TechBlitz.
            Gather insights on how to level up your skills, beyond our coding
            challenges.
          </p>
        </div>
        <GridPattern
          width={50}
          height={50}
          x={-1}
          y={-1}
          strokeDasharray={'4 2'}
          className={cn(
            'absolute inset-0 pt-44 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]'
          )}
        />
        <div className="z-10 absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {posts.length === 0 && (
            <div className="col-span-full flex flex-col gap-y-4 items-center">
              <p className="text-center">
                It look's like there are no blog posts posted at the moment.{' '}
                <br /> Why not try out today's challenge instead?
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button href="/">Homepage</Button>
                <Button href="/daily-challenge" variant="secondary">
                  Daily challenge
                </Button>
              </div>
            </div>
          )}

          {posts.map((post: any) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
