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
