import FeatureLeftRightSection from '@/components/marketing/features/daily-challenge/feature-left-right/features-section';
import FeatureDailyChallengeHero from '@/components/marketing/features/daily-challenge/hero/daily-challenge-hero';
import FeatureRoadmapCustomizationBlock from '@/components/marketing/features/roadmap/roadmap-customisation';
import StatsReportSection from '@/components/marketing/features/statistics/stats-report-section';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import MarketingContentGrid from '@/components/marketing/global/blocks/content-grid';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';
import RoadmapIcon from '@/components/ui/icons/roadmap';
import type { WebPageJsonLd } from '@/types';
import { getBaseUrl } from '@/utils';
import { QUESTIONS_COUNT } from '@/utils/constants/misc';
import { createMetadata } from '@/utils/seo';
import { MobileIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const faqs = [
  {
    question: 'Is TechBlitz suitable for complete JavaScript beginners?',
    answer:
      'Absolutely! TechBlitz is designed with beginners in mind. We start with basic JavaScript concepts like variables, functions, and loops, gradually progressing to more advanced topics. Each challenge comes with detailed explanations and hints to help you learn.',
  },
  {
    question: 'How do I start learning JavaScript as a beginner on TechBlitz?',
    answer: (
      <>
        Getting started is simple! Just{' '}
        <Link href="/signup" className="text-accent underline">
          create a free account
        </Link>{' '}
        and you'll begin with beginner-friendly JavaScript challenges that teach you the
        fundamentals step by step.
      </>
    ),
  },
  {
    question: 'Do I need any prior programming experience to start?',
    answer:
      'No prior programming experience is needed! Our JavaScript challenges start from absolute basics, assuming no previous coding knowledge. We guide you through each concept with clear explanations and examples.',
  },
  {
    question: 'How many beginner JavaScript challenges are available?',
    answer: `We offer ${QUESTIONS_COUNT}+ JavaScript challenges, with a significant portion dedicated to beginners. The challenges gradually increase in difficulty as you build confidence with the basics.`,
  },
  {
    question: 'How long does it take to learn JavaScript basics on TechBlitz?',
    answer:
      'With consistent practice of 30 minutes daily, most beginners can grasp JavaScript fundamentals within 4-6 weeks. Our structured learning path ensures you build a solid foundation before moving to advanced concepts.',
  },
  {
    question: 'What basic JavaScript concepts will I learn first?',
    answer:
      'You will start with core concepts like variables, data types, and basic operators. Then move on to functions, conditionals, loops, and arrays - all explained in beginner-friendly terms with practical examples.',
  },
  {
    question: 'Can I learn JavaScript on my phone?',
    answer:
      'Yes! Our platform is fully mobile-optimized, perfect for learning JavaScript during your commute or break time. All beginner challenges work seamlessly on phones and tablets.',
  },
  {
    question: 'Will I get help if I get stuck on a challenge?',
    answer:
      'Absolutely! Each challenge includes hints, detailed explanations, and example solutions. Plus, every user can ask our AI-assistant to explain the challenge if they get stuck.',
  },
];

const items = [
  {
    icon: <RoadmapIcon width="24" height="24" />,
    title: 'Beginner-Friendly JavaScript Path',
    description:
      'Start your coding journey with our carefully crafted beginner JavaScript roadmap. Learn fundamental concepts step by step, with no prior coding experience required.',
  },
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
    title: 'Learn at Your Own Pace',
    description:
      'Our adaptive platform adjusts to your learning speed. Start with the basics and progress naturally as you build confidence with JavaScript fundamentals.',
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
    title: 'Supportive Learning Community',
    description:
      'Join a friendly community of JavaScript beginners. Share your progress, ask questions, and learn from others who are on the same journey.',
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
    title: 'Clear Learning Path',
    description:
      'Follow our structured curriculum designed for beginners. Master JavaScript basics before progressing to intermediate concepts like DOM manipulation and async programming.',
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
    title: 'Beginner-Friendly Feedback',
    description:
      'Receive easy-to-understand feedback on your code. Our explanations use simple terms and practical examples to help you learn from mistakes and improve.',
  },
  {
    icon: <MobileIcon className="size-6" />,
    title: 'Practice Anywhere',
    description:
      'Learn JavaScript basics on any device. Our mobile-friendly platform lets you practice coding during lunch breaks, commutes, or whenever you have spare time.',
  },
];

export async function generateMetadata() {
  return createMetadata({
    title: 'JavaScript for Beginners | Learn JavaScript from Scratch | TechBlitz',
    description:
      "Start your JavaScript journey with TechBlitz's free beginner-friendly coding challenges. Learn JavaScript from scratch with step-by-step guidance, instant feedback, and a supportive community. Perfect for complete beginners!",
    image: {
      text: 'JavaScript for Beginners | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/javascript-for-beginners',
    keywords: [
      'JavaScript for beginners, learn JavaScript, JavaScript basics, JavaScript tutorial, beginner JavaScript, start coding, learn to code, JavaScript fundamentals',
    ],
  });
}

export default function JavascriptForBeginnersPage() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/javascript-for-beginners`,
    headline: 'JavaScript for Beginners | Start Learning to Code | TechBlitz',
    description:
      "Start your coding journey with TechBlitz's beginner-friendly JavaScript course. Learn JavaScript from scratch with interactive challenges, step-by-step guidance, and instant feedback—all completely free.",
    image:
      'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${getBaseUrl()}` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'JavaScript for Beginners',
          item: `${getBaseUrl()}/javascript-for-beginners`,
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
      '@id': `${getBaseUrl()}/javascript-for-beginners`,
    },
    keywords:
      'JavaScript for beginners, learn JavaScript, JavaScript basics, JavaScript tutorial, beginner JavaScript, start coding, learn to code, JavaScript fundamentals',
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
          header="JavaScript for Beginners"
          subheader="Start your coding journey with TechBlitz! Our beginner-friendly platform helps you learn JavaScript from scratch through interactive challenges and step-by-step guidance—completely free and designed for newcomers to programming."
          animatedSpan="Start Coding Today"
          rightCta={{
            title: 'Explore Beginner Roadmaps',
            href: '/roadmaps/javascript-fundamentals',
          }}
        />

        <FeatureRoadmapCustomizationBlock
          cta={{
            title: 'Explore JavaScript Roadmaps',
            href: '/roadmaps/javascript-fundamentals',
          }}
        />

        <FeatureLeftRightSection
          leftHeader="Perfect for Beginners"
          leftSubheader="TechBlitz offers challenge designed for beginners. We start with basic JavaScript concepts like variables, functions, and loops, gradually progressing to more advanced topics. Each challenge comes with detailed explanations and hints to help you learn. You will also be able to start a streak to keep you motivated."
          learnMoreLink={true}
        />

        <QuestionMarquee
          header="Learn JavaScript Step by Step"
          subheader="From writing your first line of code to building interactive web pages. TechBlitz guides beginners through every step of the JavaScript learning journey."
          cta={true}
          className="md:pt-32"
        />

        <StatsReportSection
          header="Watch your skills grow"
          subheader="See your JavaScript skills grow with our beginner-friendly progress tracking. Celebrate small wins and identify areas for practice as you master the basics of programming."
          learnMoreLink={true}
        />

        <MarketingContentGrid title="Start Your JavaScript Journey Today" items={items} />

        <FAQsBlock faqs={faqs} />

        <CallToActionBlock
          title="Begin Your Coding Adventure"
          description="Learn JavaScript from scratch with guidance every step of the way. Join thousands of beginners who started their coding journey with TechBlitz."
          leftCta={{
            title: 'Start Learning for Free',
            href: '/signup',
          }}
        />
      </div>
    </>
  );
}
