import FeatureDailyChallengeHero from '@/components/marketing/features/daily-challenge/hero/daily-challenge-hero';
import FeatureRoadmapCustomizationBlock from '@/components/marketing/features/roadmap/roadmap-customisation';
import StatsReportSection from '@/components/marketing/features/statistics/stats-report-section';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import MarketingContentGrid from '@/components/marketing/global/blocks/content-grid';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';
import { WebPageJsonLd } from '@/types/Seo';
import { getBaseUrl } from '@/utils';
import { QUESTIONS_COUNT } from '@/utils/constants/misc';
import { createMetadata } from '@/utils/seo';
import { MobileIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const faqs = [
  {
    question: 'What is a React roadmap?',
    answer:
      'A React roadmap is a comprehensive learning path designed to help you master React.js, from fundamentals to advanced concepts. Each roadmap is customized to match your skill level and learning goals.',
  },
  {
    question: 'How do I create a React roadmap?',
    answer:
      'Creating your React roadmap is straightforward. Begin with a skill assessment, and our platform will generate a personalized learning path to guide you through mastering React effectively.',
  },
  {
    question: 'Are the React challenges on TechBlitz free?',
    answer:
      'Yes, all React challenges on TechBlitz are completely free. We believe in making high-quality React education accessible to everyone.',
  },
  {
    question: 'How many React challenges are available on TechBlitz?',
    answer: `With over ${QUESTIONS_COUNT}+ free React challenges, TechBlitz covers everything from basic components to advanced state management. Each challenge is carefully crafted to build your React expertise.`,
  },
  {
    question: 'What is TechBlitz, and how does it help with React?',
    answer: (
      <>
        TechBlitz is a cutting-edge platform offering free React challenges to help you learn modern
        web development through hands-on, practical exercises.{' '}
        <Link href="/signup" className="text-accent underline">
          Sign up for a free account
        </Link>
        , select your proficiency level, and begin solving React challenges customized to your
        needs.
      </>
    ),
  },
  {
    question: 'What makes TechBlitz stand out for learning React?',
    answer:
      'TechBlitz delivers a unique learning experience with AI-powered feedback, personalized progression, and an active developer community. Our platform helps you master React faster through targeted challenges, detailed progress tracking, and expert guidance—all at no cost.',
  },
  {
    question: 'How do I get started with React challenges on TechBlitz?',
    answer: (
      <>
        Starting is simple! Just{' '}
        <Link href="/signup" className="text-accent underline">
          create your free account
        </Link>{' '}
        and dive into React challenges matched to your experience level.
      </>
    ),
  },
  {
    question: 'Does TechBlitz offer React challenges for beginners?',
    answer:
      'Absolutely! TechBlitz is ideal for beginners. Our React challenges start with core concepts and progressively introduce more advanced topics, ensuring a comfortable and effective learning experience.',
  },
  {
    question: 'Can I use TechBlitz to learn React on my mobile device?',
    answer:
      'Yes! TechBlitz features a fully responsive design optimized for mobile devices, enabling you to practice React development on your smartphone or tablet whenever and wherever you want.',
  },
  {
    question: 'What React topics are covered in the challenges?',
    answer:
      'TechBlitz provides comprehensive coverage of React topics, including hooks, components, state management, routing, performance optimization, and integration with popular tools like Redux and Next.js.',
  },
  {
    question: 'How does TechBlitz track my React learning progress?',
    answer:
      'TechBlitz offers comprehensive analytics and progress monitoring, helping you visualize your learning journey, identify areas for improvement, and celebrate achievements as you advance in your React development skills—completely free.',
  },
];

const items = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          color="currentColor"
        >
          <path d="M3.5 9.368c0-3.473 0-5.21 1.025-6.289S7.2 2 10.5 2h3c3.3 0 4.95 0 5.975 1.08C20.5 4.157 20.5 5.894 20.5 9.367v5.264c0 3.473 0 5.21-1.025 6.289S16.8 22 13.5 22h-3c-3.3 0-4.95 0-5.975-1.08C3.5 19.843 3.5 18.106 3.5 14.633z" />
          <path d="m8 2l.082.493c.2 1.197.3 1.796.72 2.152C9.22 5 9.827 5 11.041 5h1.917c1.213 0 1.82 0 2.24-.355c.42-.356.52-.955.719-2.152L16 2M8 16h4m-4-5h8" />
        </g>
      </svg>
    ),
    title: 'Personalized React Learning Paths',
    description:
      "Master React with daily customized challenges. Our adaptive platform ensures efficient learning at your own pace, whether you're just starting or building advanced applications.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 .807L23.835 8.5L22 9.693V16h-2v-5.007l-1 .65V17.5c0 1.47-1.014 2.615-2.253 3.339c-1.265.737-2.945 1.16-4.747 1.16s-3.483-.423-4.747-1.16C6.013 20.115 5 18.969 5 17.499v-5.856L.165 8.5zM7 12.943V17.5c0 .463.33 1.067 1.261 1.61c.908.53 2.227.89 3.739.89s2.831-.36 3.739-.89c.932-.543 1.26-1.147 1.26-1.61v-4.557l-5 3.25zM20.165 8.5L12 3.193L3.835 8.5L12 13.807z"
        />
      </svg>
    ),
    title: 'Clear Learning Progression',
    description:
      'Follow an organized path to React mastery, covering everything from component basics to advanced state management and performance optimization.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 12 12">
        <path
          fill="currentColor"
          d="M5 2.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M6 7a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.55 5H2a1 1 0 0 0-1 1v.207c0 .596.343 1.086.797 1.407c.272.193.597.336.952.42c.269-.488.736-.85 1.292-.981A2.49 2.49 0 0 1 3.55 5m4.41 2.053a2 2 0 0 1 1.291.98c.355-.083.68-.226.952-.419c.454-.32.797-.811.797-1.407V6a1 1 0 0 0-1-1H8.45a2.51 2.51 0 0 1-.49 2.053M4.5 8a1 1 0 0 0-1 1v.167c0 .587.357 1.058.808 1.358C4.763 10.83 5.363 11 6 11s1.237-.171 1.692-.475c.45-.3.808-.771.808-1.358V9a1 1 0 0 0-1-1zM9 4a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
        />
      </svg>
    ),
    title: 'Vibrant Developer Community',
    description:
      'Connect with React developers worldwide. Share code solutions, discuss best practices, and grow your skills alongside passionate peers.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 15q.425 0 .713-.288T13 14t-.288-.712T12 13t-.712.288T11 14t.288.713T12 15m-1-4h2V5h-2zM2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z"
        />
      </svg>
    ),
    title: 'Real-time React Feedback',
    description:
      'Receive instant, detailed feedback on your React code. Get expert explanations and practical tips to enhance your development skills—completely free.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path strokeMiterlimit="5.759" d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path strokeMiterlimit="5.759" d="m7 14l4-4l4 4l6-6" />
          <path d="M18 8h3v3" />
        </g>
      </svg>
    ),
    title: 'Comprehensive Progress Analytics',
    description:
      'Monitor your React learning journey with detailed analytics. Track performance metrics, identify improvement areas, and measure your growth with in-depth progress reports.',
  },
  {
    icon: <MobileIcon className="size-6" />,
    title: 'Learn React Anywhere',
    description:
      'Master React on any device with our responsive platform. Perfect for busy developers, our challenges are optimized for learning on desktop, tablet, or mobile.',
  },
];

export async function generateMetadata() {
  return createMetadata({
    title: 'React Roadmap | Master Modern Web Development | TechBlitz',
    description:
      "Master React.js with TechBlitz's comprehensive learning platform. Access free, hands-on coding challenges from basics to advanced concepts. Start building modern web applications today!",
    image: {
      text: 'React Roadmap | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/react-roadmap',
    keywords: [
      'React roadmap, React tutorial, learn React.js, React components, React hooks, state management, React best practices, modern web development',
    ],
  });
}

export default function ReactRoadmapPage() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/react-roadmap`,
    headline: 'React Roadmap | Master Modern Web Development | TechBlitz',
    description:
      'TechBlitz is your complete platform for mastering React development. From beginners to professionals, our practical exercises help you build modern web applications with React—completely free.',
    image:
      'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${getBaseUrl()}` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'React Roadmap',
          item: `${getBaseUrl()}/react-roadmap`,
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
      '@id': `${getBaseUrl()}/react-roadmap`,
    },
    keywords:
      'React.js, React components, React hooks, state management, modern web development, React best practices, React tutorial',
    publisher: {
      '@type': 'Organization',
      name: 'TechBlitz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://techblitz.dev/favicon.ico',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${getBaseUrl()}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <FeatureDailyChallengeHero
          header="Master React Development"
          subheader="TechBlitz provides the most comprehensive platform for learning React.js. From components to advanced state management, our hands-on exercises help developers of all levels build modern web applications—completely free."
          animatedSpan="React Mastery"
        />

        <FeatureRoadmapCustomizationBlock
          header="Your Personalized Path to React Mastery"
          subheader="Generate a custom learning roadmap with our adaptive platform, designed to help you become a proficient React developer."
          cta={{
            title: 'Create Your React Roadmap',
            href: '/signup',
          }}
        />

        <QuestionMarquee
          header="Extensive React Challenge Library"
          subheader="Progress from basic components to advanced React patterns. TechBlitz guides you through every step of your development journey."
          cta={true}
          className="md:pt-32"
        />

        <StatsReportSection
          header="Monitor Your React Development Progress"
          subheader="Get detailed insights into your learning journey. Track performance metrics, identify areas for growth, and celebrate your achievements as you advance in React development—all for free."
          learnMoreLink={true}
        />

        <MarketingContentGrid
          title="Customized React learning paths designed for your success."
          items={items}
        />

        <FAQsBlock faqs={faqs} />

        <CallToActionBlock
          title="Your Personalized Path to React Mastery"
          description="Build your custom learning roadmap with our adaptive platform, designed to help you become a proficient React developer."
          leftCta={{
            title: 'Start Your React Journey',
            href: '/signup',
          }}
        />
      </div>
    </>
  );
}
