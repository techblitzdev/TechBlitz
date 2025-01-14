// components
import FeatureRoadmapHeroBlock from '@/components/marketing/features/roadmap/roadmap-hero';
import FeatureRoadmapCustomizationBlock from '@/components/marketing/features/roadmap/roadmap-customisation';
import FeatureRoadmapThreeGridBlock from '@/components/marketing/features/roadmap/roadmap-three-grid';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import {
  Code,
  MessageSquareCode,
  Paintbrush,
  BookOpen,
  Target,
} from 'lucide-react';

import MarketingContentGrid, {
  type MarketingContentGridProps,
} from '@/components/marketing/global/blocks/content-grid';

import { MobileIcon } from '@radix-ui/react-icons';
import { createMetadata, WebPageJsonLdBreadcrumb } from '@/utils/seo';
import { WebPageJsonLd } from '@/types/Seo';
import { getBaseUrl } from '@/utils';

export async function generateMetadata() {
  return createMetadata({
    title: 'Roadmap | TechBlitz',
    description:
      'Create your own coding progression paths with our personalized roadmaps.',
    keywords: [
      'learn to code',
      'personalized coding',
      'coding roadmap',
      'learn to code with ai',
      'coding for beginners',
      'programming learning path',
      'developer career roadmap',
      'tech skills progression',
    ],
    image: {
      text: 'Roadmap | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/features/roadmap',
  });
}

// faqs
const faqs = [
  {
    question: "How can I access the roadmaps on TechBlitz's platform?",
    answer: (
      <>
        To access the roadmaps on techblitz, you need to have a premium account.
        You can sign up for a premium account{' '}
        <a href="/pricing" className="!text-accent underline">
          here
        </a>
        .
      </>
    ),
  },
  {
    question: 'What is TechBlitz, and how can it help developers?',
    answer:
      'TechBlitz is an innovative online learning platform designed for developers of all skill levels. Our tools, including quizzes, coding roadmaps, and tutorials, help you sharpen your skills, boost productivity, and stay ahead in the tech industry.',
  },
  {
    question: 'Is TechBlitz open source?',
    answer: (
      <>
        Yes, TechBlitz is completely open source! Explore our source code on{' '}
        <a
          href="https://github.com/techblitzdev/TechBlitz"
          target="_blank"
          className="!text-accent underline"
        >
          GitHub
        </a>{' '}
        and join the growing community of developers contributing to our
        platform.
      </>
    ),
  },
  {
    question: 'Is TechBlitz free to use?',
    answer:
      'Absolutely! TechBlitz offers a free plan to get you started right away. Create an account and dive into our rich library of developer resources today.',
  },
  {
    question: 'What are the key benefits of using TechBlitz?',
    answer:
      'TechBlitz provides engaging, short-form coding questions and practical roadmaps to help developers enhance their skills and tackle real-world challenges. Learn faster, smarter, and with less overwhelm!',
  },
  {
    question: 'What will you be adding to techblitz in the future?',
    answer: (
      <>
        We're constantly improving TechBlitz with new features and updates.
        Check out our{' '}
        <a
          href="https://github.com/users/Logannford/projects/5"
          target="_blank"
          className="text-accent"
        >
          roadmap
        </a>{' '}
        to see what's next, and share your suggestions — we'd love to hear your
        ideas!
      </>
    ),
  },
];

const featureShowcaseItems: MarketingContentGridProps[] = [
  {
    icon: <Target />,
    title: 'Beginner-Friendly Coding Roadmaps',
    description:
      'Start your coding journey with confidence using our beginner-focused roadmaps. Progress from basic concepts to advanced skills at your own pace.',
  },
  {
    icon: <BookOpen />,
    title: 'Free Coding Challenges',
    description:
      'Access a wealth of free programming tutorials, guides, and interactive lessons. Perfect for self-paced learning and skill development.',
  },
  {
    icon: <MobileIcon />,
    title: 'Learn to Code Anywhere',
    description:
      'Practice coding on any device with our mobile-optimized platform. Turn your commute time into learning time with accessible programming lessons.',
  },
  {
    icon: <Paintbrush />,
    title: 'Personalized Learning Experience',
    description:
      "Create custom learning paths tailored to your goals. Whether you're a complete beginner or advancing your skills, find the perfect route for your journey.",
  },
  {
    icon: <MessageSquareCode />,
    title: 'AI-Powered Assistance',
    description:
      'Get instant help with our AI tutor. Receive personalized questions, and guidance to accelerate your programming journey.',
  },
  {
    icon: <Code />,
    title: 'Practical Coding Skills',
    description:
      'Learn real-world programming through hands-on projects and exercises. Build a strong foundation in coding with our comprehensive curriculum.',
  },
];

export default function FeatureDailyQuestionPage() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: getBaseUrl(),
    headline: 'Roadmap | TechBlitz',
    description:
      'Create your own coding progression paths with our personalized roadmaps.',
    image: 'https://techblitz.dev/favicon.ico',
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
      'learn to code, learn to code for free, learn javascript, coding challenges, daily coding challenges, web development, tech skills assessment, learn to code on phone',
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
      <div className="container">
        <FeatureRoadmapHeroBlock />
        <FeatureRoadmapCustomizationBlock />
        <FeatureRoadmapThreeGridBlock />
        <MarketingContentGrid
          title="All of this and more."
          items={featureShowcaseItems}
        />
        <FAQsBlock faqs={faqs} />
        <CallToActionBlock
          title="Learning to code made easy."
          description="Create your own progression path with our personalized roadmaps, designed to help you grow as a developer."
          leftCta={{
            title: 'Get Started',
            href: '/signup',
          }}
        />
      </div>
    </>
  );
}
