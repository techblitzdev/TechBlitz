import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';

export const baseUrl = 'https://techblitz.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all blog posts
  const posts = await getBlogPosts();

  // Create sitemap entries for blog posts
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    // Using the post date as lastModified
    lastModified: new Date(post.date as string), 
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/features/roadmap`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/open-source`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Combine static routes with dynamic blog posts
  return [...routes, ...blogPosts];
}
