import { Metadata } from 'next';
import { getBaseUrl } from '@/utils';
import type { WebPageJsonLd, Question } from '@/types';

interface OgImageProps {
  text: string;
  accentColor?: string;
  textColor?: string;
  subtitle?: string;
  bgColor?: string;
}

export const createMetadata = ({
  title,
  description,
  image,
  keywords,
  canonicalUrl,
}: {
  title: string;
  description: string;
  image?: OgImageProps | string;
  keywords?: string[];
  canonicalUrl?: string;
}): Metadata => {
  const defaultKeywords = [
    'roadmaps',
    'techblitz',
    'ai',
    'coding',
    'programming',
    'software engineering',
    'developer',
    'javascript',
    'learn to code',
    'coding course',
    'coding bootcamp',
  ];

  // Ensure canonical URL is always the full URL of the current page
  const fullCanonicalUrl = canonicalUrl ? `${getBaseUrl()}${canonicalUrl}` : getBaseUrl();

  // If image is a string, use it directly as the OG image URL
  if (typeof image === 'string') {
    return {
      title,
      description,
      keywords: keywords || defaultKeywords,
      openGraph: {
        title,
        description,
        type: 'website',
        url: fullCanonicalUrl,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: description,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: description,
          },
        ],
      },
      alternates: {
        canonical: fullCanonicalUrl,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  // Handle OgImageProps case
  const textColor = image?.textColor || '#000000';

  const ogImageUrl = `
    ${getBaseUrl()}/api/og
    ?text=${encodeURIComponent(image?.text || title)}
    &accentColor=${encodeURIComponent(image?.accentColor || '#000000')}
    &subtitle=${encodeURIComponent(image?.subtitle || '')}
    &textColor=${encodeURIComponent(textColor)}
  `;

  return {
    title,
    description,
    keywords: keywords || defaultKeywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: fullCanonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: description,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: description,
        },
      ],
    },
    alternates: {
      canonical: fullCanonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

export const getQuestionEducationLevel = (question: Question['difficulty']) => {
  switch (question) {
    case 'BEGINNER':
      return 'beginner';
    case 'EASY':
      return 'beginner';
    case 'MEDIUM':
      return 'intermediate';
    case 'HARD':
      return 'advanced';
  }
};

export const WebPageJsonLdBreadcrumb: WebPageJsonLd['breadcrumb'] = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: getBaseUrl(),
    },
    // Dashboard Questions
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Coding Challenges',
      item: getBaseUrl() + '/coding-challenges',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Roadmaps',
      item: getBaseUrl() + '/roadmaps',
    },
    // Missing position 4 (Added)
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Roadmap',
      item: getBaseUrl() + '/features/roadmap',
    },
    // Features
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Daily Coding Challenges',
      item: getBaseUrl() + '/features/coding-challenges',
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'Statistics',
      item: getBaseUrl() + '/features/statistics',
    },
    // Blog
    {
      '@type': 'ListItem',
      position: 7,
      name: 'Blog',
      item: getBaseUrl() + '/blog',
    },
    // Pricing
    {
      '@type': 'ListItem',
      position: 8,
      name: 'Pricing',
      item: getBaseUrl() + '/pricing',
    },
    // FAQs
    {
      '@type': 'ListItem',
      position: 9,
      name: 'FAQs',
      item: getBaseUrl() + '/faqs',
    },
  ],
};
