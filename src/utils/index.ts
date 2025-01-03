import { Metadata } from 'next';
import { Filter } from 'bad-words';

/**
 * Method to get the current environment
 *
 * @returns 'development' | 'production' | 'test'
 */
export const getEnv = () => process.env.NODE_ENV;

export const getBaseUrl = () => {
  const publicRootDomain = process.env.NEXT_PUBLIC_URL || '';
  return getEnv() === 'development'
    ? 'http://localhost:3000'
    : publicRootDomain;
};

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
}: {
  title: string;
  description: string;
  image?: OgImageProps;
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

  const bgColor = image?.bgColor || '#f0f0f0';
  const textColor = image?.textColor || '#000000';

  const ogImage =
    image ||
    `${getBaseUrl()}/api/og?text=${encodeURIComponent(title)}&bgColor=${bgColor}&textColor=${textColor}`;

  return {
    title,
    description,
    keywords: keywords || defaultKeywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: getBaseUrl(),
      images: [
        {
          url:
            typeof ogImage === 'string'
              ? ogImage
              : `${getBaseUrl()}/api/og?text=${encodeURIComponent(image?.text || '')}&bgColor=${bgColor}&textColor=${textColor}`,
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
          url:
            typeof ogImage === 'string'
              ? ogImage
              : `${getBaseUrl()}/api/og?text=${encodeURIComponent(image?.text || '')}&bgColor=${bgColor}&textColor=${textColor}`,
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

export const getQuestionDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'EASY':
      return {
        bg: 'bg-green-500/20',
        text: 'text-green-300',
        border: 'border-green-500/30',
        hover: 'hover:bg-green-500/30',
      };
    case 'MEDIUM':
      return {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-300',
        border: 'border-yellow-500/30',
        hover: 'hover:bg-yellow-500/30',
      };
    case 'HARD':
      return {
        bg: 'bg-red-500/20',
        text: 'text-red-300',
        border: 'border-red-500/30',
        hover: 'hover:bg-red-500/30',
      };
    default:
      return {
        bg: 'bg-gray-500/20',
        text: 'text-gray-300',
        border: 'border-gray-500/30',
        hover: 'hover:bg-gray-500/30',
      };
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

export const filterBadWords = (content: string) => {
  const filter = new Filter({ placeHolder: '*' });
  return filter.clean(content);
};
