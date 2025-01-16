import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { listQuestions } from '@/utils/data/questions/list';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://techblitz.dev';

  const posts = await getBlogPosts();

  // Fetch all blog posts and questions
  const questions = await listQuestions({
    page: 1,
    pageSize: 1000,
    userUid: '',
  });

  // Create sitemap entries for blog posts
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    // Using the post date as lastModified
    lastModified: new Date(post.date as string),
  }));

  const questionsPosts = questions.questions.map((question) => ({
    url: `${baseUrl}/question/${question.slug}`,
    lastModified: new Date(question.createdAt),
  }));

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/roadmap`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/daily-coding-challenges`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/statistics`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/daily-challenge`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/open-source`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
    },
    // access routes
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/forgot-password`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/questions`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/questions/explore`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/questions/previous`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/free-leetcode-alternative`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/learn-javascript`,
      lastModified: new Date(),
    },
  ];

  // Combine static routes with dynamic blog posts
  return [...routes, ...blogPosts, ...questionsPosts];
}
