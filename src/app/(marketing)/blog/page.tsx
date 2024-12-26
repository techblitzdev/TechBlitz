import { cn } from '@/utils/cn';
import { getBlogPosts } from '@/lib/blog';

import { GridPattern } from '@/components/ui/grid-pattern';
import Image from 'next/image';
import Link from 'next/link';

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
          {posts.map((post: any) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group p-4 border border-black-50 rounded-xl hover:border-accent transition-colors"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-medium mb-2 group-hover:text-accent">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm">{post.description}</p>
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
