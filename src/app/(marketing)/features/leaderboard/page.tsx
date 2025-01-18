import { WebPageJsonLd } from '@/types/Seo';
import { createMetadata, WebPageJsonLdBreadcrumb } from '@/utils/seo';
import { getBaseUrl } from '@/utils';

export async function generateMetadata() {
  return createMetadata({
    title: 'Leaderboard | TechBlitz',
    description:
      'Coding challenges leaderboard to see how you stack up against the rest of the community.',
    keywords: [
      'coding challenges leaderboard',
      'coding challenges',
      'leaderboard',
      'tech skills assessment',
      'learn to code on phone',
      'web development',
      'tech skills assessment',
      'learn to code on phone',
    ],
    image: {
      text: `Daily Coding Challenges | TechBlitz`,
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/features/leaderboard',
  });
}

export default function LeaderboardPage() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: getBaseUrl(),
    headline: 'Leaderboard | TechBlitz',
    description:
      'Coding challenges leaderboard to see how you stack up against the rest of the community.',
    image:
      'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
    breadcrumb: WebPageJsonLdBreadcrumb,
    author: {
      '@type': 'Organization',
      name: 'TechBlitz',
      url: getBaseUrl(),
    },
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getBaseUrl(),
    },
    keywords:
      'coding challenges leaderboard, coding challenges, leaderboard, tech skills assessment, learn to code on phone',
    publisher: {
      '@type': 'Organization',
      name: 'TechBlitz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://techblitz.dev/favicon.ico',
      },
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
