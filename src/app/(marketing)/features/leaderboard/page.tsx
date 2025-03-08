import { WebPageJsonLd } from '@/types/Seo';
import { createMetadata } from '@/utils/seo';
import { getBaseUrl } from '@/utils';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import LeaderboardHero from '@/components/marketing/features/leaderboard/leaderboard-hero';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import MarketingContentGrid, {
  MarketingContentGridProps,
} from '@/components/marketing/global/blocks/content-grid';
import { BarChart, Code, MessageSquareCode, Paintbrush, Sun } from 'lucide-react';
import { MobileIcon } from '@radix-ui/react-icons';
import Testimonials from '@/components/marketing/global/blocks/testimonials';
import LeaderboardPodiumShowcase from '@/components/marketing/features/leaderboard/leaderboard-podium-showcase';
import LeaderboardFeatures from '@/components/marketing/features/leaderboard/leaderboard-features';
import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';

// metadata
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
      text: `Leaderboard | TechBlitz`,
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/features/leaderboard',
  });
}

const faqs = [
  {
    question: 'What is the leaderboard?',
    answer:
      'The leaderboard is a showcase of the top developers on TechBlitz. Giving you a chance to see how you stack up against the rest of the community.',
  },
  {
    question: 'How is the leaderboard calculated?',
    answer:
      'Currently, the leaderboard is calculated based on the number of challenges you have completed. We are working on adding more metrics to the leaderboard as we speak!',
  },
  {
    question: 'How do I get on the leaderboard?',
    answer:
      'You can get on the leaderboard by completing challenges. The more challenges you complete, the higher you will climb on the leaderboard.',
  },
  {
    question: "But I don't want to be on the leaderboard?",
    answer:
      'That\'s fine! You can opt out of the leaderboard by going to your profile settings and toggling the "Show on leaderboard" option. No pressure.',
  },
  {
    question: 'Is TechBlitz free?',
    answer:
      'Yes! TechBlitz is 100% free. We believe that everyone should have access to the tools and resources they need to learn to code. You can sign up for free and start coding today!',
  },
  {
    question: 'What are the key benefits of using TechBlitz?',
    answer:
      'TechBlitz provides engaging, short-form coding questions and practical roadmaps to help developers enhance their skills and tackle real-world challenges. Learn faster, smarter, and with less overwhelm!',
  },
  {
    question: 'Is TechBlitz open source?',
    answer: (
      <>
        Yes, TechBlitz is completely open source! Explore our source code on{' '}
        <a href="https://git.new/blitz" target="_blank" className="!text-accent underline">
          GitHub
        </a>{' '}
        and join the growing community of developers contributing to our platform.
      </>
    ),
  },
  {
    question: 'This sounds great! Where do I sign up?',
    answer: (
      <>
        You can sign up for a free account{' '}
        <a href="/signup" className="!text-accent underline">
          here
        </a>
        ! We're excited to see you on the leaderboard!
      </>
    ),
  },
];

const featureShowcaseItems: MarketingContentGridProps[] = [
  {
    icon: <Code />,
    title: 'Enjoyable way to learn',
    description:
      'The TechBlitz is a great way to make coding fun and engaging. We have a wide range of challenges to choose from, and you can even generate your own challenges, personalized to you!',
  },
  {
    icon: <MobileIcon />,
    title: 'Learn to Code Anywhere',
    description:
      'Learn to code on any device with our mobile-optimized platform. Turn your morning commute time into productive learning time with accessible programming lessons.',
  },
  {
    icon: <Paintbrush />,
    title: 'Personalized Learning Experience',
    description: (
      <>
        Create custom learning paths tailored to your goals. Whether you're a complete beginner or
        advancing your skills, find the perfect route for your journey. Learn more{' '}
        <a href="/features/roadmap" className="!text-accent underline">
          here
        </a>
        .
      </>
    ),
  },
  {
    icon: <MessageSquareCode />,
    title: 'AI-Powered Assistance',
    description: (
      <>
        Get instant help with our AI tutor. Receive personalized questions, and guidance to
        accelerate your programming journey.
      </>
    ),
  },
  {
    icon: <BarChart />,
    title: 'Track Your Progress',
    description: (
      <>
        Keep track of your coding progress with our coding analytics. See your progression, create
        custom coding challenges, and more. Learn more{' '}
        <a href="/features/statistics" className="!text-accent underline">
          here
        </a>
        .
      </>
    ),
  },
  {
    icon: <Sun />,
    title: 'Daily Coding Challenges',
    description: (
      <>
        Bite-sized coding challenges to keep you engaged and learning. Perfect for busy developers
        who want to stay sharp and improve their skills. You can learn more{' '}
        <a href="/features/daily-coding-challenges" className="!text-accent underline">
          here
        </a>
        .
      </>
    ),
  },
];

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
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${getBaseUrl()}` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Features',
          item: `${getBaseUrl()}/features`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Leaderboard',
          item: `${getBaseUrl()}/features/leaderboard`,
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
      <div className="container">
        <LeaderboardHero />
        <LeaderboardPodiumShowcase />
        <LeaderboardFeatures />
        <MarketingContentGrid
          title="Coding made enjoyable."
          subheading="Everything you need in one place to learn to code."
          items={featureShowcaseItems}
        />

        <QuestionMarquee
          header="Coding questions for everyone."
          subheader="A wide range of coding questions to choose from, from your first challenge to first job."
        />

        <FAQsBlock faqs={faqs} />
        <div className="pb-20">
          <Testimonials />
        </div>
        <CallToActionBlock
          title="Get started for free."
          description="See how you stack up against the rest of the community - and improve your skills along the way."
          leftCta={{
            title: 'Get Started',
            href: '/signup',
          }}
        />
      </div>
    </>
  );
}
