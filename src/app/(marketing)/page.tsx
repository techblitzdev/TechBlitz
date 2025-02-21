import dynamic from 'next/dynamic';

import HomepageHero from '@/components/marketing/homepage/hero/hero';

const FeaturesBentoGrid = dynamic(
  () => import('@/components/marketing/homepage/features/features-bento-grid'),
  { ssr: false }
);

import PersonalizedBlock from '@/components/marketing/homepage/personalized/block';
import ComparisonBlock from '@/components/marketing/homepage/comparison/comparison-block';
import OpenSourceBlock from '@/components/marketing/global/open-source/open-source-block';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';

import { Metadata } from 'next';
import { getBaseUrl } from '@/utils';
import { WebPageJsonLd } from '@/types/Seo';
import Testimonials from '@/components/marketing/global/blocks/testimonials';
import MarketingContentGrid, {
  MarketingContentGridProps,
} from '@/components/marketing/global/blocks/content-grid';
import { MobileIcon } from '@radix-ui/react-icons';
import { CodeIcon, Users2 } from 'lucide-react';
import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';
import HomepageUserStats from '@/components/marketing/global/blocks/homepage-user-stats';
import { QUESTIONS_COUNT } from '@/utils/constants';
import { getUserCount } from '@/utils/data/user/get-user-count';

const title = 'Learn to Code for Free - TechBlitz';
const description =
  "Master programming with TechBlitz's free interactive coding challenges. Get personalized practice, instant AI feedback, and step-by-step guidance. Perfect for beginners!";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    url: 'https://techblitz.dev',
    images: {
      url: 'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
      width: 800,
      height: 630,
      alt: description,
    },
  },
  twitter: {
    title,
    description,
    images: [
      {
        url: 'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
        width: 800,
        height: 630,
        alt: description,
      },
    ],
  },
  alternates: {
    canonical: getBaseUrl(),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: getBaseUrl(),
    headline: title,
    description,
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
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
      'learn to code for free, beginner-friendly coding lessons, interactive coding challenges, daily programming practice, personalized coding roadmap, improve coding skills, best platform to learn coding, AI-assisted coding, learn javascript',
    publisher: {
      '@type': 'Organization',
      name: 'TechBlitz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://techblitz.dev/favicon.ico',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getBaseUrl(),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Challenges',
          item: `${getBaseUrl()}/questions/all`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Roadmaps',
          item: `${getBaseUrl()}/roadmaps`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Pricing',
          item: `${getBaseUrl()}/pricing`,
        },
      ],
    },
  };

  const contentGridItems: MarketingContentGridProps[] = [
    {
      title: 'In browser code editor',
      description:
        'Practice coding in your browser with our in-browser coded editor. No need to install anything to learn to code!',
      icon: <CodeIcon className="size-6" />,
    },
    {
      title: 'Beginner-Friendly Platform',
      description:
        'Perfect for beginners - start with basic challenges and gradually advance your skills. Our step-by-step approach and clear explanations makes improving coding skills easy and enjoyable.',
      icon: <Users2 className="size-6" />,
    },
    {
      title: 'Seamless mobile experience',
      description:
        'Practice on the go with our mobile-friendly coding platform. Access your dashboard from any device, anywhere.',
      icon: <MobileIcon className="size-6" />,
    },
  ];

  // not awaiting as we are passing it the component that needs it to prevent render blocking
  const userCount = getUserCount();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="overflow-x-hidden container z-30">
        <HomepageHero />
        <Testimonials />
        <FeaturesBentoGrid />
        <HomepageUserStats userCountPromise={userCount} />
        <PersonalizedBlock />
        <QuestionMarquee
          header={`${QUESTIONS_COUNT}+ coding challenges`}
          subheader="Learn to code by doing. Improve your coding skills in as little as 3 minutes per day."
        />
        <ComparisonBlock />
        <MarketingContentGrid
          title="Beginner-friendly coding challenges"
          subheading="Join aspiring developers worldwide learning to code through TechBlitz's free, interactive programming challenges. Get personalized practice, instant feedback, and step-by-step guidance on your coding journey."
          items={contentGridItems}
        />
        <OpenSourceBlock />
        <CallToActionBlock
          title="Land the job you've always dreamed of"
          description="Ready to unlock your full potential? Try TechBlitz for free, no credit card required."
        />
      </div>
    </>
  );
}
