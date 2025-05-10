import StatsHero from '@/components/marketing/features/statistics/stats-hero';
import StatsReportSection from '@/components/marketing/features/statistics/stats-report-section';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import MarketingContentGrid from '@/components/marketing/global/blocks/content-grid';
import { MobileIcon } from '@radix-ui/react-icons';
import { BarChart, Code, FileBadge2, LaptopIcon } from 'lucide-react';
import { createMetadata } from '@/utils/seo';
import type { WebPageJsonLd } from '@/types';
import { getBaseUrl } from '@/utils';

export async function generateMetadata() {
  return createMetadata({
    title: 'In-depth Coding Statistics | TechBlitz',
    description:
      'Understand your strengths and weaknesses with our in-depth coding statistics. Ensuring you are on the right track to become a better developer.',
    keywords: [
      'track coding progress',
      'coding statistics',
      'developer analytics',
      'coding performance insights',
      'improve coding skills',
      'coding improvement tools',
      'coding mastery',
      'coding challenges dashboard',
    ],
    image: {
      text: 'In-depth Coding Statistics | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/features/statistics',
  });
}

const featureShowcaseItems = [
  {
    title: 'Track Your Coding Progress',
    description:
      'Monitor your daily coding activity with detailed statistics and progress tracking to build consistent learning habits.',
    icon: <Code />,
  },
  {
    title: 'Developer Analytics Dashboard',
    description:
      'Get deep insights into your coding performance with comprehensive analytics across different programming concepts and challenges.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 14">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7" cy="7" r="6.5" />
          <path d="M7 .5V7l4.6 4.6" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Measure Coding Mastery',
    description:
      'Track your journey to coding mastery with detailed performance metrics and achievement milestones that showcase your growing expertise.',
    icon: <FileBadge2 />,
  },
  {
    title: 'Performance Insights',
    description:
      'Leverage powerful analytics tools to identify your strengths and areas for improvement, helping you become a better developer.',
    icon: <LaptopIcon />,
  },
  {
    title: 'Coding Improvement Tools',
    description:
      'Access a suite of statistical tools and visualizations designed to help you track and improve your coding skills over time.',
    icon: <BarChart />,
  },
  {
    title: 'Challenge Dashboard',
    description:
      'Monitor your progress through coding challenges with a comprehensive dashboard that tracks your solutions and learning patterns.',
    icon: <MobileIcon />,
  },
];

export default function StatisticsPage() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: getBaseUrl(),
    headline: 'Track your coding journey | TechBlitz',
    description: 'Track your coding journey with our statistics dashboard.',
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
          name: 'Statistics',
          item: `${getBaseUrl()}/features/statistics`,
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
      '@id': `${getBaseUrl()}/features/statistics`,
    },
    keywords:
      'track coding progress, coding statistics, developer analytics, coding performance insights, improve coding skills, coding improvement tools, coding mastery, coding challenges dashboard',
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
        <StatsHero />
        <StatsReportSection />
        <MarketingContentGrid
          title="Tracking coding progress made simple."
          items={featureShowcaseItems}
        />
        <CallToActionBlock title="Improve coding skills effortlessly." />
      </div>
    </>
  );
}
