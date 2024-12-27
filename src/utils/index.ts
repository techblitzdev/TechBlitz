import { Metadata } from 'next';

/**
 * Method to get the current environment
 *
 * @returns 'development' | 'production' | 'test'
 */
export const getEnv = () => process.env.NODE_ENV;

export const getBaseUrl = () => {
  const publicRootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';
  return getEnv() === 'development'
    ? 'http://localhost:3000'
    : publicRootDomain;
};

export const createMetadata = ({
  title,
  description,
  image,
  keywords,
}: {
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
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

  const ogImage =
    image ||
    `${getBaseUrl()}/api/og?text=${encodeURIComponent(title)}&bgColor=%23f0f0f0&textColor=%23000000`;

  return {
    title,
    description,
    keywords: keywords || defaultKeywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://techblitz.dev/features/roadmaps',
      images: [
        {
          url: ogImage,
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
          url: ogImage,
          width: 1200,
          height: 630,
          alt: description,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

export const capitalise = (string: string) => {
  if (!string) return '';
  // lowercase the whole string
  const lowercaseString = string?.toLowerCase();
  return lowercaseString[0]?.toUpperCase() + lowercaseString?.slice(1);
};

// border-green-500 border-yellow-500 border-red-500 text-green-500 text-yellow-500 text-red-500
export const getQuestionDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'EASY':
      return 'green-500';
    case 'MEDIUM':
      return 'yellow-500';
    case 'HARD':
      return 'red-500';
    default:
      return 'gray';
  }
};

/**
 * A method to easily truncate and add ellipsis to any string.
 *
 * @param content
 * @param wordLimit
 */
export const shortenText = (content: string, wordLimit: number) => {
  return content.length > wordLimit
    ? `${content.substring(0, wordLimit)}...`
    : content;
};
