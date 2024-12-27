import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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

    return {
      title: `${typedFrontmatter.title} | TechBlitz Blog`,
      description: typedFrontmatter.description,
      openGraph: {
        title: typedFrontmatter.title,
        description: typedFrontmatter.description,
        type: 'article',
        publishedTime: typedFrontmatter.date,
        authors: [typedFrontmatter.author],
      },
    };
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
            <h1 className="text-4xl lg:text-5xl font-medium mb-4">
              {typedFrontmatter.title}
            </h1>
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
          <div className="prose prose-invert prose-pre:bg-black-75 prose-pre:border prose-pre:border-black-50 max-w-none">
            {content}
          </div>
        </article>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
