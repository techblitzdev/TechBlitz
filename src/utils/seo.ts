import { Metadata } from 'next';
import { getBaseUrl } from '@/utils';
import { Question } from '@/types/Questions';
import { WebPageJsonLd } from '@/types/Seo';

interface OgImageProps {
  text: string;
  bgColor?: string;
  textColor?: string;
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
  const fullCanonicalUrl = canonicalUrl
    ? `${getBaseUrl()}${canonicalUrl}`
    : getBaseUrl();

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
  const bgColor = image?.bgColor || '#f0f0f0';
  const textColor = image?.textColor || '#000000';
  const ogImageUrl = `${getBaseUrl()}/api/og?text=${encodeURIComponent(image?.text || title)}&bgColor=${encodeURIComponent(bgColor)}&textColor=${encodeURIComponent(textColor)}`;

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
    // dashboard questions
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Questions',
      item: getBaseUrl() + '/questions',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Study Paths',
      item: getBaseUrl() + '/study-paths',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Daily Challenge',
      item: getBaseUrl() + '/daily-challenge',
    },
    // features
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Roadmap',
      item: getBaseUrl() + '/features/roadmap',
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'Features',
      item: getBaseUrl() + '/features/daily-coding-challenges',
    },
    {
      '@type': 'ListItem',
      position: 7,
      name: 'Statistics',
      item: getBaseUrl() + '/features/statistics',
    },
    // blog
    {
      '@type': 'ListItem',
      position: 8,
      name: 'Blog',
      item: getBaseUrl() + '/blog',
    },
    // pricing
    {
      '@type': 'ListItem',
      position: 9,
      name: 'Pricing',
      item: getBaseUrl() + '/pricing',
    },
    // faqs
    {
      '@type': 'ListItem',
      position: 10,
      name: 'FAQs',
      item: getBaseUrl() + '/faqs',
    },
  ],
};
