import { Metadata } from 'next';
import Image from 'next/image';
import { GithubIcon, LinkedinIcon } from 'lucide-react';

import { getBlogPosts } from '@/lib/blog';
import { createMetadata } from '@/utils/seo';
import BlogCard from '@/components/marketing/resources/blog/blog-card';
import Hero from '@/components/shared/hero';
import { TwitterLogoIcon } from '@radix-ui/react-icons';

// Author metadata for SEO
export const metadata: Metadata = createMetadata({
  title: 'Logan Ford | TechBlitz',
  description:
    'Logan Ford is a software engineer, educator, and founder of TechBlitz, focused on helping developers improve their coding skills.',
  keywords: ['Logan Ford', 'TechBlitz', 'software engineer', 'educator', 'developer advocate'],
  image: {
    text: 'Logan Ford | TechBlitz',
    bgColor: '#000',
    textColor: '#fff',
  },
  canonicalUrl: '/author/logan',
});

const Header = () => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image
          src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/user-profile-pictures/3a57d7e8-8b80-483b-93d0-70fe1f06b0c0/logo.png?u=1l5im5h5n6e5"
          alt="Logan Ford"
          width={100}
          height={100}
          className="rounded-full size-24"
        />
        <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl font-bold">Logan Ford</h1>
          <p className="text-xl text-gray-300">Founder & Lead Developer</p>
        </div>
      </div>
      {/* Social Links */}
      <div className="flex gap-4 mt-8 h-fit">
        <a
          href="https://github.com/Logannford"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-black-100 hover:bg-primary-500 transition-colors duration-200"
          aria-label="GitHub Profile"
        >
          <GithubIcon size={20} />
        </a>
        <a
          href="https://x.com/techblitz_dev"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-black-100 hover:bg-primary-500 transition-colors duration-200"
          aria-label="Twitter Profile"
        >
          <TwitterLogoIcon className="size-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/logan-ford-627a51243/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-black-100 hover:bg-primary-500 transition-colors duration-200"
          aria-label="LinkedIn Profile"
        >
          <LinkedinIcon size={20} />
        </a>
      </div>
    </div>
  );
};

export default async function LoganAuthorPage() {
  // Fetch all blog posts and filter for those authored by Logan
  const allPosts = await getBlogPosts();
  const loganPosts = allPosts.filter(
    (post) => post.author?.toLowerCase() === 'logan ford' || post.author?.toLowerCase() === 'logan'
  );

  return (
    <div className="container max-w-7xl mx-auto pt-32 pb-20">
      <div className="grid grid-cols-1 gap-10">
        {/* Author Profile Card */}
        <div className="flex flex-col md:flex-row">
          {/* Author Image */}
          <Hero heading={<Header />} />
        </div>

        {/* Author's Articles Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Articles by Logan</h2>

          {loganPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loganPosts.slice(0, 6).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 py-8">No articles found. Check back soon!</p>
          )}
        </section>
      </div>
    </div>
  );
}
