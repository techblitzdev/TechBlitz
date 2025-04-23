import FeatureLeftRightSection from '@/components/marketing/features/daily-challenge/feature-left-right/features-section';
import FeatureDailyChallengeHero from '@/components/marketing/features/daily-challenge/hero/daily-challenge-hero';
import FeatureRoadmapThreeGridBlock from '@/components/marketing/features/roadmap/roadmap-three-grid';
import StatsReportSection from '@/components/marketing/features/statistics/stats-report-section';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import MarketingContentGrid from '@/components/marketing/global/blocks/content-grid';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import FeatureIconGrid from '@/components/marketing/global/blocks/feature-icon-grid';
import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';
import Document from '@/components/ui/icons/document';
import MaterialSymbolsFilterListRounded from '@/components/ui/icons/filter';
import RoadmapIcon from '@/components/ui/icons/roadmap';
import type { WebPageJsonLd } from '@/types';
import { getBaseUrl } from '@/utils';
import { QUESTIONS_COUNT } from '@/utils/constants/misc';
import { createMetadata } from '@/utils/seo';
import { MobileIcon } from '@radix-ui/react-icons';
import { Code } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: 'How does TechBlitz help me learn JavaScript effectively?',
    answer:
      'TechBlitz offers real-world coding challenges designed to simulate professional scenarios. Our platform adapts to your skill level, providing personalized challenges that guide you from beginner to advanced JavaScript mastery.',
  },
  {
    question: 'How many JavaScript challenges are available on TechBlitz?',
    answer: `With over ${QUESTIONS_COUNT}+ coding challenges, TechBlitz covers a wide range of JavaScript topics, including syntax, functions, and web development. Each challenge is crafted to enhance your problem-solving skills.`,
  },
  {
    question: 'What is TechBlitz, and how does it work?',
    answer: (
      <>
        TechBlitz is a cutting-edge coding challenge platform that helps you learn JavaScript
        through interactive, real-world exercises.{' '}
        <Link href="/signup" className="text-accent underline">
          Sign up for a free account
        </Link>
        , choose your skill level, and start solving challenges tailored to your needs.
      </>
    ),
  },
  {
    question: 'What makes TechBlitz stand out from other coding platforms?',
    answer:
      'TechBlitz stands out with its personalized learning experience, AI-powered feedback, and a vibrant community. Our platform ensures you learn essential JavaScript skills faster with tailored challenges, progress tracking, and expert support.',
  },
  {
    question: 'How do I get started with TechBlitz?',
    answer: (
      <>
        Getting started is easy! Simply{' '}
        <Link href="/signup" className="text-accent underline">
          sign up for a free account
        </Link>{' '}
        and begin solving JavaScript challenges tailored to your skill level.
      </>
    ),
  },
  {
    question: 'Does TechBlitz offer discounts for students?',
    answer:
      'Yes, we offer a 30% discount for students. Contact our support team with your student email to redeem this offer.',
  },
  {
    question: 'Can I use TechBlitz on my mobile device?',
    answer:
      'Absolutely! TechBlitz is fully optimized for mobile devices, allowing you to practice JavaScript coding on your phone or tablet anytime, anywhere.',
  },
  {
    question: 'What programming languages does TechBlitz support?',
    answer:
      'TechBlitz primarily focuses on JavaScript and web development. We are working on adding more languages in the future.',
  },
  {
    question: 'Is TechBlitz suitable for beginners?',
    answer:
      'Yes, TechBlitz is perfect for beginners. Our challenges start with foundational JavaScript concepts and gradually increase in complexity, ensuring a smooth learning curve for all skill levels.',
  },
  {
    question: 'How does TechBlitz ensure my progress is tracked effectively?',
    answer:
      'TechBlitz provides detailed analytics and progress reports, allowing you to track your performance, identify weak areas, and celebrate milestones as you advance in your JavaScript journey.',
  },
  {
    question: 'How can I master string methods in JavaScript?',
    answer: (
      <>
        To master string methods in JavaScript, you can try our{' '}
        <Link
          href="/javascript-cheat-sheet/javascript-string-cheat-sheet"
          className="text-accent underline"
        >
          string cheat sheet
        </Link>
        .
      </>
    ),
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
    title: 'Personalized JavaScript Learning Paths',
    description:
      'Master JavaScript with tailored challenges delivered daily. Whether you’re on your phone, tablet, or computer, our adaptive platform ensures you learn JavaScript syntax and concepts at your own pace.',
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
    title: 'Daily JavaScript Challenges',
    description:
      'Sharpen your JavaScript skills with daily coding challenges designed for all levels. From JavaScript syntax cheat sheets to advanced web development, our bite-sized exercises make learning fun and effective.',
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
    title: 'Engage with a Global JavaScript Community',
    description:
      'Join a thriving community of JavaScript developers. Share solutions, exchange ideas, and grow together with peers from around the world.',
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
    title: 'Instant Feedback & JavaScript Solutions',
    description:
      'Get real-time feedback on your JavaScript code. Learn from detailed explanations and improve your skills faster with actionable insights.',
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
    title: 'Track Your JavaScript Progress',
    description:
      'Visualize your JavaScript coding journey with advanced analytics. Monitor your performance, identify strengths, and target areas for improvement with detailed progress reports.',
  },
  {
    icon: <MobileIcon className="size-6" />,
    title: 'Learn JavaScript Anywhere, Anytime',
    description:
      'Practice JavaScript coding on the go with our mobile-friendly platform. Perfect for busy schedules, our challenges are optimized for seamless learning on any device.',
  },
];

// metadata
export async function generateMetadata() {
  return createMetadata({
    title: 'The Ultimate JavaScript Syntax Cheat Sheet | TechBlitz',
    description:
      'Master JavaScript syntax with our comprehensive cheat sheet. Learn JavaScript syntax, tips, and best practices with TechBlitz. Perfect for beginners and advanced developers alike.',
    image: {
      text: 'The Ultimate JavaScript Cheat Sheet | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/javascript-cheat-sheet',
  });
}

const FeatureLeftRightSectionSubheader = () => (
  <div className="flex flex-col gap-4">
    <span>
      JavaScript is a fundamental programming language that powers the web. Nearly 99% of all
      websites on the internet use JavaScript. It's a must-have skill for any web developer.
    </span>
    <span>
      We provide a comprehensive javascript syntax cheat sheet to help you master JavaScript syntax,
      tips, and best practices, guaranteed to help you become a better developer in no time.
    </span>
  </div>
);

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

export default function JavascriptCheatSheet() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/javascript-cheat-sheet`,
    headline: 'The Ultimate JavaScript Cheat Sheet | TechBlitz',
    description:
      'Master JavaScript with our comprehensive javascript cheat sheet. Learn JavaScript syntax, tips, and best practices with TechBlitz. Perfect for beginners and advanced developers alike.',
    image:
      'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${getBaseUrl()}` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'JavaScript Cheat Sheet',
          item: `${getBaseUrl()}/javascript-cheat-sheet`,
        },
      ],
    },
    author: {
      '@type': 'Organization',
      name: 'TechBlitz',
      url: `${getBaseUrl()}/javascript-cheat-sheet`,
    },
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${getBaseUrl()}/javascript-cheat-sheet`,
    },
    keywords:
      'javascript cheat sheet, js cheat sheet, javascript syntax cheat sheet, js syntax cheat sheet, cheatsheet javascript, learn javascript, javascript tips, javascript syntax',
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
          header="JavaScript Syntax Cheat Sheet: Master JavaScript Syntax"
          subheader="Discover the ultimate JavaScript cheat sheet with TechBlitz. Learn JavaScript syntax, best practices, and tips to become a pro developer. Perfect for beginners and advanced coders."
          animatedSpan="Start mastering JavaScript today"
          className="xl:w-2/3"
          leftCta={{
            title: 'Read the Javascript Array Cheat Sheet',
            href: '/javascript-cheat-sheet/javascript-array-cheat-sheet',
          }}
          rightCta={{
            title: 'Read the Regular Expression Cheat Sheet',
            href: '/javascript-cheat-sheet/regular-expression-cheat-sheet',
          }}
        />

        <FeatureLeftRightSection
          leftHeader="JavaScript Syntax Cheat Sheet"
          leftSubheader={<FeatureLeftRightSectionSubheader />}
          learnMoreLink={true}
          paddingBottom="lg:pb-10"
        />

        <FeatureIconGrid items={featureIconGridItems} borderTop />

        <FeatureRoadmapThreeGridBlock
          title="Learn JavaScript Syntax with Personalized Learning"
          description="Generate personalized learning paths based on your current skill level. We analyze your strengths and weaknesses to deliver the best JavaScript challenges for your growth."
        />

        <StatsReportSection
          header="Track Your JavaScript Progress"
          subheader="Learning JavaScript syntax is a journey. With TechBlitz, you can easily generate code reports to track your progress and understand your weaknesses. Get actionable insights with personalized performance analytics. Monitor your progress, identify areas for improvement, and celebrate your achievements as you learn JavaScript syntax."
          learnMoreLink={true}
        />

        <QuestionMarquee
          header="Learn JavaScript Syntax with Free Challenges"
          subheader="With TechBlitz, you can learn JavaScript syntax with free challenges. No need to sign up for a subscription. Just practice and improve your skills at your own pace.."
        />

        <MarketingContentGrid
          title="Everything You Need to Master JavaScript Syntax"
          items={items}
        />

        <FAQsBlock faqs={faqs} />

        <CallToActionBlock
          title="Master JavaScript Syntax Today"
          description="Join TechBlitz and unlock your potential with real-world JavaScript challenges, personalized learning paths, and a supportive community."
        />
      </div>
    </>
  );
}
