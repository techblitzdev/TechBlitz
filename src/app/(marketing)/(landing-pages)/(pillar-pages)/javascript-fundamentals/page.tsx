import FeatureLeftRightSection from '@/components/marketing/features/daily-challenge/feature-left-right/features-section';
import FeatureDailyChallengeHero from '@/components/marketing/features/daily-challenge/hero/daily-challenge-hero';
import FeatureRoadmapThreeGridBlock from '@/components/marketing/features/roadmap/roadmap-three-grid';
import StatsReportSection from '@/components/marketing/features/statistics/stats-report-section';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import MarketingContentGrid from '@/components/marketing/global/blocks/content-grid';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import { WebPageJsonLd } from '@/types/Seo';
import { getBaseUrl } from '@/utils';
import { createMetadata } from '@/utils/seo';
import { MobileIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { getUserCount } from '@/utils/data/user/get-user-count';

const faqs = [
  {
    question: 'Is JavaScript free?',
    answer:
      'Yes, JavaScript is free to use. JavaScript is a client-side scripting language that is used to create dynamic and interactive web pages (however, JavaScript can also be used on the server side with Node.js).',
  },
  {
    question: 'Is JavaScript a scripting language?',
    answer:
      'Yes, JavaScript is a scripting language. While it started as a client-side scripting language for web browsers, it has evolved into a versatile programming language that can be used for both client-side and server-side development (Node.js), mobile apps, desktop applications, and more. It remains one of the core technologies for creating dynamic and interactive web experiences.',
  },
  {
    question: 'What are the usages for JavaScript?',
    answer:
      'JavaScript is used to create dynamic and interactive web pages. It is also used to create mobile apps, desktop applications, and more. It is a versatile language that can be used for a wide range of applications.',
  },
  {
    question: 'Is JavaScript good for beginners?',
    answer:
      'Yes, JavaScript is a great language for beginners. It is a relatively easy language to learn and it is a very popular language. It is a vital language to learn for web development. ',
  },
  {
    question: 'How can I learn JavaScript as a beginner?',
    answer: (
      <>
        There are many different ways to learn JavaScript as a beginner. A recommended approach is
        to learn by doing. You can do this by{' '}
        <Link href="/signup" className="text-accent underline">
          signing up for a free account
        </Link>{' '}
        and begin solving challenges tailored to your skill level.
      </>
    ),
  },
  {
    question: 'What are the best practices for writing JavaScript?',
    answer:
      'There are many best practices for writing JavaScript. A few of the most important ones are to use meaningful variable and function names, to keep functions small and focused, and to use descriptive names for arrays and objects.',
  },
  {
    question: 'How can I learn JavaScript online?',
    answer: (
      <>
        TechBlitz is the #1 platform for learning to code JavaScript. We offer a wide range of
        coding challenges for beginners and professionals. You can learn JavaScript by solving
        challenges tailored to your skill level.{' '}
        <Link href="/signup" className="text-accent underline">
          Sign up for a free account
        </Link>{' '}
        and begin solving challenges tailored to your skill level.
      </>
    ),
  },
  {
    question: 'How can I learn JavaScript for free?',
    answer: (
      <>
        TechBlitz is the #1 platform for learning to code JavaScript for free. We offer a wide range
        of coding challenges for beginners and professionals. You can learn JavaScript by solving
        challenges tailored to your skill level.
        <Link href="/signup" className="text-accent underline">
          Sign up for a free account
        </Link>{' '}
        and begin solving challenges tailored to your skill level.
      </>
    ),
  },
  {
    question: 'Is JavaScript a difficult language to learn?',
    answer: (
      <>
        JavaScript is a relatively easy language to learn. It is a very popular language and it is a
        vital language to learn for web development.
      </>
    ),
  },
  {
    question: 'How can I write a function in JavaScript?',
    answer: (
      <>
        There are a few different ways to write a function in JavaScript. You can learn more about
        them by reading our blog post{' '}
        <Link
          href="/javascript-fundamentals/how-to-write-a-function-in-javascript"
          className="text-accent underline"
        >
          How to write a function in JavaScript
        </Link>
      </>
    ),
  },
  {
    question: 'Is JavaScript programming language?',
    answer: (
      <>
        Yes, JavaScript is a programming language. It is a client-side scripting language that is
        used to create dynamic and interactive web pages.
      </>
    ),
  },
  {
    question: 'Where can I find a free javascript online course?',
    answer: (
      <>
        TechBlitz is the #1 platform for learning to code JavaScript for free. We offer a wide range
        of coding challenges for beginners and professionals.
      </>
    ),
  },
  {
    question: 'What is the difference between double equals and triple equals in JavaScript?',
    answer: (
      <>
        Double equals (`==`) is used for loose equality comparison, while triple equals (`===`) is
        used for strict equality comparison.{' '}
        <Link
          href="/javascript-fundamentals/loose-vs-strict-equality-in-javascript"
          className="text-accent underline"
        >
          Learn more about the difference between double equals and triple equals in JavaScript
        </Link>
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
    title: 'Personalized Coding Challenges',
    description:
      "Master coding with challenges tailored to your skill level. Whether you're on your phone, tablet, or computer, our platform ensures you learn at your own pace.",
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
    title: 'Daily Coding Challenges',
    description:
      'Sharpen your skills with daily coding challenges designed for all levels. From JavaScript fundamentals to advanced web development, our bite-sized exercises make learning fun and effective.',
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
    title: 'Engage with a Global Community',
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
    title: 'Instant Feedback & Solutions',
    description:
      'Get real-time feedback on your code. Learn from detailed explanations and improve your JavaScript skills faster with actionable insights.',
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
    title: 'Track Your Progress',
    description:
      'Visualize your coding journey with advanced analytics. Monitor your performance, identify strengths, and target areas for improvement with detailed progress reports.',
  },
  {
    icon: <MobileIcon className="size-6" />,
    title: 'Learn Anywhere, Anytime',
    description:
      'Practice coding on the go with our mobile-friendly platform. Perfect for busy schedules, our challenges are optimized for seamless learning on any device.',
  },
];

// Metadata
export async function generateMetadata() {
  return createMetadata({
    title: 'JavaScript Fundamentals | Learn JavaScript & Web Development | TechBlitz',
    description:
      'TechBlitz offers a wide range of coding challenges for beginners and professionals. Master JavaScript, web development, and programming with real-world exercises designed to enhance your coding skills.',
    image: {
      text: 'JavaScript Fundamentals | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/javascript-fundamentals',
    keywords: [
      'coding challenges, coding challenges for beginners, JavaScript coding challenges, web development challenges, interactive coding challenges, learn programming, coding for developers',
    ],
  });
}

export default async function JavaScriptFundamentalsPage() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/javascript-fundamentals`,
    headline: 'JavaScript Fundamentals | TechBlitz',
    description:
      'TechBlitz offers a wide range of coding challenges for beginners and professionals. Master JavaScript, web development, and programming with real-world exercises designed to enhance your coding skills.',
    image:
      'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
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
          name: 'JavaScript Fundamentals',
          item: `${getBaseUrl()}/javascript-fundamentals`,
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

  // round the user count to the nearest 1000
  const userCount = await getUserCount().then((count) => Math.round(count / 10) * 10);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <FeatureDailyChallengeHero
          header="JavaScript Fundamentals"
          subheader="Master the core concepts of JavaScript - from variables and functions to advanced topics like asynchronous programming and DOM manipulation. Start your journey to becoming a proficient JavaScript developer today."
          animatedSpan="JavaScript Fundamentals"
          leftCta={{
            href: '/javascript-fundamentals/how-does-javascript-work',
            title: 'How Does JavaScript Work?',
          }}
          rightCta={{
            href: '/javascript-fundamentals/how-to-write-javascript',
            title: 'How do I write JavaScript?',
          }}
        />

        <FeatureLeftRightSection
          leftHeader="The Best Free JavaScript Course Online"
          leftSubheader="Master JavaScript with our comprehensive free course. Perfect for beginners and experienced developers alike, our interactive lessons and exercises make learning JavaScript easy and engaging."
          learnMoreLink={true}
          leftCta={{
            href: '/javascript-fundamentals/how-does-javascript-work',
            title: 'How Does JavaScript Work?',
          }}
        />

        <FeatureRoadmapThreeGridBlock
          title="Complete JavaScript Training & Resources"
          description="Access a full JavaScript programming course with structured learning paths, hands-on tutorials, and real-world projects. Whether you're a complete beginner or looking to level up your skills, our JavaScript training has everything you need."
          cta={true}
        />

        <StatsReportSection
          header="The Best Place to Learn JavaScript"
          subheader="Join millions of developers learning JavaScript on TechBlitz. Our free JavaScript tutorials and online classes provide the perfect environment to master JavaScript programming at your own pace."
          learnMoreLink={true}
        />

        <MarketingContentGrid title="Everything You Need to Learn to Code" items={items} />

        <FAQsBlock faqs={faqs} />

        <CallToActionBlock
          title="Start Solving Coding Challenges Today"
          description={`Join over ${userCount} users learning to code on TechBlitz. Our free JavaScript tutorials and online classes provide the perfect environment to master JavaScript programming at your own pace.`}
        />
      </div>
    </>
  );
}
