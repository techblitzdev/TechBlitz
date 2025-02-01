import { shortenText } from '@/utils';
import Link from 'next/link';

export default function BlogCard(opts: { post: any }) {
  const { post } = opts;

  return (
    <Link
      key={post.slug}
      href={`/blog/${post.slug}`}
      className="group p-4 bg-[#000] border border-black-50 rounded-xl hover:border-accent transition-colors flex flex-col justify-between h-full"
    >
      <div>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="rounded-lg mb-4 w-full h-60 object-scale-down"
          />
        )}
        <h2 className="text-xl font-medium mb-2 group-hover:text-accent line-clamp-2">
          {post.title}
        </h2>
        {post.description && (
          <p className="text-gray-400 text-sm">{shortenText(post.description, 75)}</p>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <img src={post.authorImage} alt={post.author} className="w-4 h-4 rounded-full" />
          <span className="text-sm text-gray-500">{post.author}</span>
        </div>
        <span>•</span>
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
  );
}
