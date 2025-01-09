// components
import FeatureRoadmapHeroBlock from '@/components/marketing/features/roadmap/roadmap-hero';
import FeatureRoadmapCustomizationBlock from '@/components/marketing/features/roadmap/roadmap-customisation';
import FeatureRoadmapThreeGridBlock from '@/components/marketing/features/roadmap/roadmap-three-grid';
import CallToActionBlock from '@/components/marketing/global/call-to-action-block';
import FAQsBlock from '@/components/marketing/global/faqs';
import { Code, Globe, MessageSquareCode, Paintbrush, User } from 'lucide-react';

import MarketingContentGrid, {
  type MarketingContentGridProps,
} from '@/components/marketing/global/content-grid';

import { MobileIcon } from '@radix-ui/react-icons';
import { createMetadata } from '@/utils';

export async function generateMetadata() {
  return createMetadata({
    title: 'Roadmap | TechBlitz',
    description:
      'Create your own progression path with our AI powered roadmaps.',
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
    question: 'When will TechBlitz launch?',
    answer:
      'TechBlitz is set to launch in Q1 2025! Join our waitlist today to get early access and be notified as soon as we go live.',
  },
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
        We’re constantly improving TechBlitz with new features and updates.
        Check out our{' '}
        <a
          href="https://github.com/users/Logannford/projects/5"
          target="_blank"
          className="text-accent"
        >
          roadmap
        </a>{' '}
        to see what’s next, and share your suggestions — we’d love to hear your
        ideas!
      </>
    ),
  },
];

const featureShowcaseItems: MarketingContentGridProps[] = [
  {
    icon: <User />,
    title: 'Personalized Learning Path',
    description:
      'Experience adaptive learning with our roadmaps that evolve with your progress. Get a customized curriculum that matches your skill level and career goals.',
  },
  {
    icon: <Globe />,
    title: 'Industry-Standard Problem Solving',
    description:
      'Master professional software development with real enterprise challenges. Build a portfolio of solutions that top tech companies actually use.',
  },
  {
    icon: <MobileIcon />,
    title: 'Learn Anywhere with Mobile Access',
    description:
      'Never miss a learning opportunity with our responsive platform. Study during commutes, breaks, or whenever inspiration strikes - available 24/7 on all devices.',
  },
  {
    icon: <Paintbrush />,
    title: 'Create Your Perfect Learning Journey',
    description:
      'Take control of your education with fully customizable learning paths. Add, remove, or modify content to create the exact curriculum you need for career success.',
  },
  {
    icon: <MessageSquareCode />,
    title: 'Instant Expert Feedback System',
    description:
      'Accelerate your learning with our intelligent feedback engine. Get detailed explanations and suggestions that help you understand concepts deeply and fix mistakes instantly.',
  },
  {
    icon: <Code />,
    title: 'Complete Developer Evolution',
    description:
      'Transform from coding novice to industry expert with our comprehensive curriculum. Join thousands who’ve accelerated their tech careers through our proven learning system.',
  },
];

export default function FeatureDailyQuestionPage() {
  return (
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
        title="The smarter way to stay on top of tech."
        description="Create your own progression path with our personalized roadmaps, designed to help you grow as a developer."
        leftCta={{
          title: 'Get Started',
          href: '/signup',
        }}
      />
    </div>
  );
}
