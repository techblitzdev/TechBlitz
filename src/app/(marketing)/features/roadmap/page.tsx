// components
import FeatureRoadmapHeroBlock from '@/components/marketing/features/roadmap/roadmap-hero';
import FeatureRoadmapCustomizationBlock from '@/components/marketing/features/roadmap/roadmap-customisation';
import FeatureRoadmapThreeGridBlock from '@/components/marketing/features/roadmap/roadmap-three-grid';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import { Code, MessageSquareCode, Paintbrush, BookOpen, Target } from 'lucide-react';

import MarketingContentGrid, {
  type MarketingContentGridProps,
} from '@/components/marketing/global/blocks/content-grid';

import { MobileIcon } from '@radix-ui/react-icons';
import { createMetadata } from '@/utils/seo';
import type { WebPageJsonLd } from '@/types';
import { getBaseUrl } from '@/utils';
import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';
import RoadmapShowcaseBlock from '@/components/marketing/global/blocks/roadmap-showcase';
import FeatureIconGrid from '@/components/marketing/global/blocks/feature-icon-grid';
import RoadmapIcon from '@/components/ui/icons/roadmap';
import MaterialSymbolsFilterListRounded from '@/components/ui/icons/filter';
import Document from '@/components/ui/icons/document';

export async function generateMetadata() {
  return createMetadata({
    title: 'Personalized Coding Roadmaps | TechBlitz',
    description:
      'Create your own coding progression paths with our personalized roadmaps. Our AI-powered roadmap generator helps you stay on track and achieve your goals.',
    image: {
      text: 'Personalized Coding Roadmaps | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/features/roadmap',
  });
}

// faqs
const faqs = [
  {
    question: "How do TechBlitz's AI-powered roadmaps work?",
    answer:
      'Our AI-powered roadmaps analyze your current skills, learning goals, and preferred pace to create a personalized learning path. The system adapts as you progress, recommending resources and challenges that match your evolving skill level.',
  },
  {
    question: "Can I customize my coding roadmap after it's generated?",
    answer:
      'Absolutely! You can modify your roadmap at any time. Add new skills you want to learn, adjust the difficulty level, or change your learning timeline to match your schedule and goals.',
  },
  {
    question: 'How often are new technologies and learning paths added to TechBlitz?',
    answer:
      'We regularly update our platform with new technologies and learning paths. Our team monitors industry trends and adds relevant content monthly, ensuring you always have access to the most current and in-demand skills in the tech industry.',
  },
  {
    question: 'How do roadmaps integrate with other TechBlitz features?',
    answer:
      "Your personalized roadmap seamlessly connects with our daily coding challenges, tutorials, and practice exercises. As you progress through your roadmap, you'll be recommended relevant learning materials that reinforce your current focus area.",
  },
  {
    question: 'Are the roadmaps suitable for complete beginners?',
    answer:
      'Yes! Our roadmaps are designed for all skill levels. For beginners, we create paths that start with fundamentals and gradually introduce more complex concepts. The AI adapts to your pace, ensuring you build a solid foundation before moving to advanced topics.',
  },
  {
    question: 'What makes TechBlitz roadmaps different from other learning paths?',
    answer: (
      <>
        Unlike static learning paths, our AI-powered roadmaps evolve with you. They identify
        knowledge gaps, suggest targeted practice, and adjust based on your performance. Plus, you
        can track your progress in real-time and celebrate milestones along the way. Check out our{' '}
        <a href="/pricing" className="!text-accent underline">
          premium plans
        </a>{' '}
        to access this feature.
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

const roadmapShowcaseSubHeader = () => (
  <>
    <p className="text-gray-400">
      As if Duolingo and LeetCode had a baby - TechBlitz is the perfect place to learn to code for
      people of all ages. Ensuring you receive a personalized learning experience tailored to your
      needs.
    </p>
    <p className="text-gray-400">
      We ensure our roadmaps are always up to date with the latest technologies and trends in the
      industry. With the ability to generate your own roadmaps, you can focus on the topics that
      matter most to you.
    </p>
  </>
);

export default function FeatureDailyQuestionPage() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: getBaseUrl(),
    headline: 'Personalized Coding Roadmaps | TechBlitz',
    description:
      'Create your own coding progression paths with our personalized roadmaps. Our AI-powered roadmap generator helps you stay on track and achieve your goals.',
    image: 'https://techblitz.dev/favicon.ico',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${getBaseUrl()}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Roadmaps',
          item: `${getBaseUrl()}/features/roadmap`,
        },
      ],
    },
    author: {
      '@type': 'Organization',
      name: 'TechBlitz',
      url: getBaseUrl(),
    },
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${getBaseUrl()}/features/roadmap`,
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

  const featureIconGridItems = [
    {
      title: 'Interactive Challenges',
      description:
        'Practice with hands-on coding challenges that simulate real-world scenarios. Build skills while solving problems that matter.',
      icon: <Code width="1.5em" height="1.5em" />,
    },
    {
      title: 'Structured Learning Paths',
      description:
        'Follow a simple, structured learning path to boost your coding skills. Opt-in to receive daily reminders to complete it!',
      icon: <RoadmapIcon height="1.5em" width="1.5em" />,
    },
    {
      title: 'Generate Code Reports',
      description:
        "Don't just code blindly. Generate code reports to track your progress and understand your weaknesses.",
      icon: <Document width="1.5em" height="1.5em" />,
    },
    {
      title: 'Advanced Filtering',
      description:
        'Easily navigate through our vast library of coding challenges with our advanced filtering options.',
      icon: <MaterialSymbolsFilterListRounded className="size-6" />,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <FeatureRoadmapHeroBlock />
        <FeatureRoadmapCustomizationBlock />
        <RoadmapShowcaseBlock
          title="Structured learning made fun"
          subheader={roadmapShowcaseSubHeader()}
          studyPathFirst
          paddingTop="md:pt-12"
          paddingBottom="md:pb-10"
        />

        <FeatureIconGrid
          borderTop
          items={featureIconGridItems}
          paddingTop="pt-12"
          paddingBottom="pb-24"
        />

        <FeatureRoadmapThreeGridBlock />
        <MarketingContentGrid
          title="Personalized learning at your fingertips."
          items={featureShowcaseItems}
        />
        <QuestionMarquee
          header="Generate your own coding questions"
          subheader="Generate your own coding questions with our AI-powered question generator. Perfect for your daily coding practice."
          cta
        />
        <FAQsBlock faqs={faqs} />
        <CallToActionBlock
          title="Learning to code made easy."
          description="Create your own progression path with our personalized roadmaps, designed to help you grow as a developer."
        />
      </div>
    </>
  );
}
