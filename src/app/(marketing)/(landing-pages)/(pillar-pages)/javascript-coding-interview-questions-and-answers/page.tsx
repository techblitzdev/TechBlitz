import FeatureLeftRightSection from '@/components/marketing/features/daily-challenge/feature-left-right/features-section';
import FeatureDailyChallengeHero from '@/components/marketing/features/daily-challenge/hero/daily-challenge-hero';
import FeatureRoadmapThreeGridBlock from '@/components/marketing/features/roadmap/roadmap-three-grid';
import StatsReportSection from '@/components/marketing/features/statistics/stats-report-section';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import MarketingContentGrid from '@/components/marketing/global/blocks/content-grid';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';
import { WebPageJsonLd } from '@/types/Seo';
import { getBaseUrl } from '@/utils';
import { QUESTIONS_COUNT } from '@/utils/constants/misc';
import { createMetadata, WebPageJsonLdBreadcrumb } from '@/utils/seo';
import { MobileIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const faqs = [
  {
    question: 'What are the most common JavaScript interview questions?',
    answer: (
      <>
        TechBlitz provides comprehensive JavaScript interview questions and answers, from basic JS
        coding questions to advanced JavaScript technical interview questions. Access our
        <Link href="/roadmaps/javascript-fundamentals" className="text-accent underline">
          free JavaScript tutorial
        </Link>{' '}
        to prepare for your next coding interview.
      </>
    ),
  },
  {
    question: 'What JavaScript coding interview questions should I expect?',
    answer: `Our online learning platform features ${QUESTIONS_COUNT}+ JavaScript coding interview questions and answers, including live coding problems with examples. We cover both basic web development concepts and advanced JavaScript programming for experienced developers.`,
  },
  {
    question: 'How do I prepare for JavaScript technical interviews?',
    answer: (
      <>
        Learn JavaScript online through our curated collection of programming exercises and
        real-time coding challenges.
        <Link href="/signup" className="text-accent underline">
          Start our free JavaScript course now
        </Link>
        and master JavaScript programming step by step.
      </>
    ),
  },
  {
    question: 'What makes TechBlitz the best website to learn JavaScript?',
    answer: (
      <>
        Our JavaScript online course combines theory with hands-on practice. We offer a complete{' '}
        <Link href="/roadmaps/javascript-fundamentals" className="text-accent underline">
          JavaScript training program
        </Link>{' '}
        covering everything from HTML, CSS and JavaScript basics to advanced server-side
        development.
      </>
    ),
  },
  {
    question: 'Where can I learn JavaScript for free online?',
    answer: (
      <>
        Access our comprehensive JavaScript programming course by{' '}
        <Link href="/signup" className="text-accent underline">
          creating a free account
        </Link>
        . Perfect for web developers looking to learn JavaScript programming through practical
        exercises.
      </>
    ),
  },
  {
    question: 'What basic JavaScript concepts should I know?',
    answer:
      'Our JavaScript beginner course covers essential web development concepts, JavaScript frameworks, and software development fundamentals to build a strong foundation.',
  },
  {
    question: 'Are the JavaScript programming classes mobile-friendly?',
    answer:
      'Yes, access our JavaScript online class and programming exercises on any device. Our online learning platform is optimized for mobile learning.',
  },
  {
    question: 'How often are the JavaScript resources updated?',
    answer:
      'We regularly update our JavaScript training materials and coding exercises to reflect current industry standards and web development best practices.',
  },
  {
    question: 'Do you provide JavaScript code examples with solutions?',
    answer:
      'Yes, we provide detailed solutions and explanations for all JavaScript programming challenges, including real-time coding examples for web applications.',
  },
  {
    question: 'How do you track progress in the JavaScript course?',
    answer:
      'Our platform tracks your progress through JavaScript programming exercises and coding challenges, providing detailed performance analytics for continuous improvement.',
  },
  {
    question: 'Why choose TechBlitz for JavaScript training?',
    answer:
      'As the best site to learn JavaScript, we offer comprehensive JavaScript resources from basic web development to advanced programming, with detailed explanations and hands-on practice.',
  },
  {
    question: 'How can I practice JavaScript programming?',
    answer:
      'Access our collection of JavaScript exercises, real-time coding challenges, and practical web development projects designed to help you learn the basics and beyond.',
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
    title: 'Free JavaScript Course Library',
    description:
      'Access our comprehensive collection of JavaScript tutorials and coding exercises. Learn JavaScript online through hands-on practice designed for all experience levels.',
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
    title: 'JavaScript Training Program',
    description:
      'Master web development through our JavaScript online course. Perfect for aspiring web developers looking to build modern web applications.',
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
    title: 'JavaScript Learning Community',
    description:
      'Join our community of JavaScript developers learning programming fundamentals and advanced concepts. Share solutions and learn from experienced developers.',
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
    title: 'JavaScript Resources',
    description:
      'Access our comprehensive JavaScript programming resources, including step-by-step tutorials and technical challenges for all skill levels.',
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
    title: 'Learning Progress Tracking',
    description:
      'Track your progress through our JavaScript online course and web development materials. Get detailed analytics on your performance.',
  },
  {
    icon: <MobileIcon className="size-6" />,
    title: 'Mobile Learning',
    description:
      'Learn JavaScript programming on any device. Our online learning platform is optimized for mobile access to help you learn JavaScript for free anywhere.',
  },
];

// metadata
export async function generateMetadata() {
  return createMetadata({
    title: 'JavaScript Interview Questions and Answers | TechBlitz',
    description:
      'Access comprehensive JavaScript interview questions and answers, including live coding problems and technical challenges. Perfect for experienced developers preparing for interviews.',
    image: {
      text: 'JavaScript Interview Questions and Answers | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/javascript-coding-interview-questions-and-answers',
  });
}

export default function JavascriptInterviewQuestions() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/javascript-coding-interview-questions-and-answers`,
    headline: 'JavaScript Interview Questions and Answers | TechBlitz',
    description:
      'Access comprehensive JavaScript interview questions and answers, including live coding problems and technical challenges. Perfect for experienced developers preparing for interviews.',
    image:
      'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
    breadcrumb: WebPageJsonLdBreadcrumb,
    author: {
      '@type': 'Organization',
      name: 'TechBlitz',
      url: `${getBaseUrl()}/javascript-coding-interview-questions-and-answers`,
    },
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${getBaseUrl()}/javascript-coding-interview-questions-and-answers`,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container">
        <FeatureDailyChallengeHero
          header="JavaScript Interview Questions and Answers"
          subheader="Master JavaScript with our comprehensive collection of coding interview questions, live coding problems, and technical challenges for all experience levels."
          animatedSpan="Prepare for your next technical interview"
          className="xl:w-2/3"
          leftCta={{
            title: 'Practice JS Coding Questions',
            href: '/javascript-coding-interview-questions-and-answers/javascript-coding-test',
          }}
          rightCta={{
            title: 'Advanced JavaScript Questions',
            href: '/javascript-coding-interview-questions-and-answers/javascript-interview-questions-for-senior-developers',
          }}
        />

        <FeatureLeftRightSection
          leftHeader="JavaScript Technical Interview Preparation"
          leftSubheader="Create personalized JavaScript challenges to prepare for your next technical interview. Practice with live coding problems and technical challenges designed for your experience level."
          learnMoreLink={true}
          leftCta={{
            title: 'View JavaScript Interview Questions',
            href: '/roadmaps/javascript-fundamentals',
          }}
          rightHeader="JavaScript Coding Exercises"
          rightSubheader="Master JavaScript through hands-on coding exercises and technical interview preparation materials."
        />

        <MarketingContentGrid title="JavaScript Interview Resources" items={items} />

        <FeatureRoadmapThreeGridBlock
          title="JavaScript Interview Preparation"
          description="Access our comprehensive collection of JavaScript interview questions, coding exercises, and technical challenges designed for all experience levels."
          cta={true}
        />

        <StatsReportSection
          header="Interview Progress Tracking"
          subheader="Track your progress through JavaScript coding questions and technical interview preparation materials."
          learnMoreLink={true}
        />

        <QuestionMarquee
          header="JavaScript Technical Interview Questions"
          subheader="Practice with our collection of JavaScript interview questions and coding challenges. Perfect for developers preparing for technical interviews."
          cta={true}
        />

        <FAQsBlock faqs={faqs} />

        <CallToActionBlock
          title="Start JavaScript Interview Prep"
          description="Access our comprehensive collection of JavaScript interview questions and coding challenges. Begin your technical interview preparation today."
        />
      </div>
    </>
  );
}
