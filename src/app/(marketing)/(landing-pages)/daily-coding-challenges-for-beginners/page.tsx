import { createMetadata } from '@/utils/seo';

import { WebPageJsonLd } from '@/types/Seo';
import { getBaseUrl } from '@/utils';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import Link from 'next/link';
import FeatureDailyChallengeHero from '@/components/marketing/features/daily-challenge/hero/daily-challenge-hero';
import ComparisonBlock from '@/components/marketing/homepage/comparison/comparison-block';
import FeatureLeftRightSection from '@/components/marketing/features/daily-challenge/feature-left-right/features-section';
import MarketingContentGrid from '@/components/marketing/global/blocks/content-grid';
import { MobileIcon } from '@radix-ui/react-icons';

const faqs = [
  {
    question: 'What are daily coding challenges?',
    answer:
      'Daily coding challenges are short, real-world problems that you can solve in 5 minutes or less.',
  },
  {
    question: 'How do daily coding challenges help beginners?',
    answer:
      'Daily coding challenges are designed to help beginners learn essential coding skills faster than ever. They are designed to be challenging, but not too difficult, so that you can learn essential coding skills faster than ever.',
  },
  {
    question: 'How do I get started?',
    answer: (
      <>
        <Link href="/signup" className="text-accent">
          Sign up here
        </Link>{' '}
        to access a world of free daily coding challenges. TechBlitz is your gateway to mastering
        coding skills with ease and efficiency.
      </>
    ),
  },
  {
    question: 'What makes TechBlitz different?',
    answer:
      'We ensure all challenges mimic real-world problems. Ensuring you can learn essential coding skills faster than ever. From JavaScript, Node.js, React, and more, we have you covered.',
  },
  {
    question: 'What if I get stuck?',
    answer:
      'If you need help, it is only a click away. With our AI assistant, you can get help with your coding challenges in seconds. Ensuring you get the help you need to solve your coding challenges.',
  },
  {
    question: 'How do I track my progress?',
    answer: (
      <>
        With our progress tracker, you can track your progress on your coding challenges. Ensuring
        you can see your progress and celebrate your achievements. Find out more{' '}
        <Link href="/features/statistics" className="text-accent">
          here
        </Link>
        .
      </>
    ),
  },
  {
    question: 'What if I want to learn more?',
    answer: (
      <>
        We update our coding question suite with new challenges every day. Ensuring you can learn
        essential coding skills faster than ever. You can view the question suite{' '}
        <Link href="/coding-challenges" className="text-accent">
          here
        </Link>
        .
      </>
    ),
  },
];

const items = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 12 12">
        <path
          fill="currentColor"
          d="M5 2.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M6 7a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.55 5H2a1 1 0 0 0-1 1v.207c0 .596.343 1.086.797 1.407c.272.193.597.336.952.42c.269-.488.736-.85 1.292-.981A2.49 2.49 0 0 1 3.55 5m4.41 2.053a2 2 0 0 1 1.291.98c.355-.083.68-.226.952-.419c.454-.32.797-.811.797-1.407V6a1 1 0 0 0-1-1H8.45a2.51 2.51 0 0 1-.49 2.053M4.5 8a1 1 0 0 0-1 1v.167c0 .587.357 1.058.808 1.358C4.763 10.83 5.363 11 6 11s1.237-.171 1.692-.475c.45-.3.808-.771.808-1.358V9a1 1 0 0 0-1-1zM9 4a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
        />
      </svg>
    ),
    title: 'Vibrant JavaScript Community',
    description:
      'Help shape the future of TechBlitz. Share your ideas, feedback, and suggestions to improve our platform. Perfect for those engaging in daily coding challenges for beginners.',
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
    title: 'Bite-sized Learning',
    description:
      'Master complex JavaScript concepts in just 15 minutes a day with our expertly crafted micro-challenges. Perfect for busy developers looking for daily coding challenges.',
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
      'Daily coding challenges for beginners to improve your JavaScript skills. Learn to code for free, with our short-form, interactive coding challenges from a range of topics including JavaScript, React, Node.js, web development, and more.',
  },
  {
    icon: <MobileIcon className="size-6" />,
    title: 'Seamless Mobile Learning',
    description:
      'Learn JavaScript on your phone. Practice during commutes or breaks with our optimized mobile interface - never miss a day of learning.',
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
    title: 'Instant Feedback',
    description:
      'Get real-time feedback on your coding challenges. Learn from mistakes and improve faster.',
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
    title: 'Advanced Analytics',
    description:
      'Visualize your JavaScript coding journey with detailed performance metrics. Track your progress across topics, algorithms, and problem-solving patterns.',
  },
];

// metadata
export async function generateMetadata() {
  return createMetadata({
    title: 'Daily Coding Challenges for Beginners | TechBlitz',
    description:
      'TechBlitz transforms your coding journey into a personalized, engaging, and effective experience. Ensuring you learn essential coding skills faster than ever.',
    image: {
      text: 'Daily Coding Challenges for Beginners | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/daily-coding-challenges-for-beginners',
  });
}

export default function DailyCodingChallengesForBeginnersPage() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/daily-coding-challenges-for-beginners`,
    headline: 'Daily Coding Challenges for Beginners | TechBlitz',
    description:
      'Embark on a transformative coding journey with TechBlitz. Our platform offers personalized, engaging challenges that accelerate your learning of essential coding skills.',
    image:
      'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${getBaseUrl()}` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Daily Coding Challenges for Beginners',
          item: `${getBaseUrl()}/daily-coding-challenges-for-beginners`,
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
      '@id': `${getBaseUrl()}/daily-coding-challenges-for-beginners`,
    },
    keywords:
      'Daily coding challenges for beginners, coding challenges for beginners, daily coding challenges, coding challenges, beginner coding challenges, coding challenges for beginners, daily coding challenges for beginners, coding challenges for beginners, beginner coding challenges for beginners',
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
          header="Daily Coding Challenges for Beginners"
          subheader="Join TechBlitz today and dive into our free daily coding challenges tailored for beginners. Enhance your skills with real-world problems and track your progress."
          animatedSpan="Daily Coding Challenges"
        />
        <FeatureLeftRightSection
          leftHeader="Beginner-friendly coding challenges"
          leftSubheader="Beginner-friendly coding challenges that mimic real-world problems. Ensuring you can learn essential coding skills faster than ever. Ensure you never miss a day of learning with streaks, making it easier to stay consistent."
          learnMoreLink={true}
        />
        <ComparisonBlock
          header="Real-world coding challenges"
          subheader="Beginner-friendly coding challenges that mimic real-world problems. Ensuring you can learn essential coding skills faster than ever."
        />
        <MarketingContentGrid title="Your all in one coding challenge platform" items={items} />
        <QuestionMarquee
          header="Learn to code effortlessly with beginner-friendly coding challenges"
          subheader="Join TechBlitz today and dive into our free daily coding challenges tailored for beginners. Enhance your skills with real-world problems and track your progress."
          cta={true}
        />
        <FAQsBlock faqs={faqs} />
        <CallToActionBlock
          title="Start Your Coding Adventure Today"
          description="Sign up now to access a world of free daily coding challenges. TechBlitz is your gateway to mastering coding skills with ease and efficiency."
        />
      </div>
    </>
  );
}
