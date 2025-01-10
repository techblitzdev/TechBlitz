export type QuizJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'Quiz';
  name: string;
  description: string;
  url: string;
  educationLevel: string;
  educationalUse: string;
  learningResourceType: string[];
  creator: {
    '@type': 'Organization';
    name: 'TechBlitz';
    url: string;
  };
  assesses: string[];
  dateCreated: string;
  dateModified: string;

  // can either be when the question was created, or when it went 'live'
  // as a daily question
  datePublished: string;

  // the headline of the question
  headline: string;

  interactivityType: 'mixed' | 'active' | 'expositive';

  isAccessibleForFree: boolean;

  isFamilyFriendly: boolean;

  teaches: string;
};

export type WebPageJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  // The URL of the webpage
  url: string;
  // The headline or title of the webpage
  headline: string;
  // A brief description of the webpage
  description: string;
  // The URL of the image representing the webpage
  image: string;
  author?: {
    '@type': 'Person' | 'Organization';
    // Name of the author or organization
    name: string;
    // URL of the author's profile or organization
    url?: string;
  };
  publisher?: {
    '@type': 'Organization';
    // Name of the publisher
    name: string;
    logo?: {
      '@type': 'ImageObject';
      // URL of the publisher's logo
      url: string;
    };
  };
  // ISO 8601 date format: e.g., "2023-01-01T12:00:00Z"
  datePublished?: string;
  // ISO 8601 date format
  dateModified?: string;
  mainEntityOfPage?: {
    '@type': 'WebPage';
    // Canonical URL of the main entity of the page
    '@id': string;
  };
  // Comma-separated list of keywords
  keywords?: string;
  breadcrumb?: {
    '@type': 'BreadcrumbList';
    itemListElement: {
      '@type': 'ListItem';
      // Position of the breadcrumb in the list
      position: number;
      // Name of the breadcrumb item
      name: string;
      // URL of the breadcrumb item
      item: string;
    }[];
  };
};

export type FaqJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
};
