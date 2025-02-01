import type { MetadataRoute } from 'next'
//import { getBlogPosts } from '@/lib/blog';
import { listQuestions } from '@/utils/data/questions/list'
import { getAllStudyPaths } from '@/utils/data/study-paths/get'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://techblitz.dev'

  // Fetch all blog posts and questions
  const [questions, studyPaths] = await Promise.all([
    listQuestions({
      page: 1,
      pageSize: 1000,
      userUid: '',
    }),
    getAllStudyPaths(),
  ])

  const studyPathSlugs = studyPaths.map((studyPath) => ({
    url: `${baseUrl}/study-paths/${studyPath.slug}`,
    lastModified: new Date(studyPath.createdAt),
  }))

  // for some reason, the blog posts are not being when invoking
  // the getBlogPosts function, but only from here.
  // manually adding the blog post slugs for now (TODO: fix this)

  // Create sitemap entries for blog posts
  //const blogPosts = posts.map((post) => ({
  //  url: `${baseUrl}/blog/${post.slug}`,
  //  // Using the post date as lastModified
  //  lastModified: new Date(post.date as string),
  //}))

  const blogPostSlugs = [
    'how-to-become-a-software-engineer-2025',
    'how-to-use-filter-in-javascript',
    'how-to-use-map-in-javascript',
    'how-to-use-reduce-in-javascript',
    'how-to-use-sort-in-javascript',
    'how-to-use-some-in-javascript',
    'introducing-techblitz',
    'what-are-callback-functions',
    '250-users-on-techblitz',
  ]

  const blogPosts = blogPostSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
  }))

  const questionsPosts = questions.questions.map((question) => ({
    url: `${baseUrl}/question/${question.slug}`,
    lastModified: new Date(question.createdAt),
  }))

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
      url: `${baseUrl}/features/leaderboard`,
      lastModified: '2025-01-18',
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
    {
      url: `${baseUrl}/changelog`,
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
      url: `${baseUrl}/study-paths`,
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
    {
      url: `${baseUrl}/daily-coding-challenges-for-beginners`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/react-coding-challenges`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/learn-to-code`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/how-to-learn-to-code`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/how-to-learn-javascript`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/daily-coding-challenges`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/coding-challenges`,
      lastModified: new Date(),
    },
  ]

  // Combine static routes with dynamic blog posts
  return [...routes, ...blogPosts, ...questionsPosts, ...studyPathSlugs]
}
