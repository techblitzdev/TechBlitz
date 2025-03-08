import Link from 'next/link';

import FeatureDailyChallengeHero from '@/components/marketing/features/daily-challenge/hero/daily-challenge-hero';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import MarketingContentGrid from '@/components/marketing/global/blocks/content-grid';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import { MobileIcon } from '@radix-ui/react-icons';
import FeatureLeftRightSection from '@/components/marketing/features/daily-challenge/feature-left-right/features-section';

import { createMetadata } from '@/utils/seo';
import { getBaseUrl } from '@/utils';
import { WebPageJsonLd } from '@/types/Seo';
import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';
import { getUserCount } from '@/utils/data/user/get-user-count';

export async function generateMetadata() {
  return createMetadata({
    title: 'Free JavaScript Course & Daily Coding Challenges | TechBlitz',
    description:
      'Learn JavaScript online for free with our comprehensive JavaScript course and daily coding challenges. Perfect for web developers looking to master JavaScript programming, HTML, CSS and modern JavaScript frameworks through hands-on practice.',
    image: {
      text: `Free JavaScript Course & Daily Coding Challenges | TechBlitz`,
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/features/daily-coding-challenges',
  });
}

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
    title: 'Step-by-Step JavaScript Training',
    description:
      'Master JavaScript programming through our structured online course. Learn the basics to advanced concepts with bite-sized lessons perfect for busy web developers.',
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
    title: 'Free JavaScript Course',
    description:
      'Access our comprehensive JavaScript online course for free. Learn JavaScript programming from basics to building real-time web applications and server-side development.',
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
    title: 'JavaScript Developer Community',
    description:
      'Join our thriving community of web developers learning JavaScript. Get support for HTML, CSS, and JavaScript frameworks while building web applications.',
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
    title: 'Real-Time JavaScript Training',
    description:
      'Get instant feedback on your JavaScript code as you learn. Our online learning platform provides real-time guidance for faster skill development.',
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
    title: 'Track Your JavaScript Journey',
    description:
      'Monitor your progress in software development with our advanced analytics. Track your growth from JavaScript basics to creating complex web applications.',
  },
  {
    icon: <MobileIcon className="size-6" />,
    title: 'Learn JavaScript Anywhere',
    description:
      'Access our JavaScript online course on any device. Our online learning platform lets you practice JavaScript programming anytime, anywhere.',
  },
];

const faqs = [
  {
    question: 'Where can I learn JavaScript for free?',
    answer:
      'TechBlitz offers a comprehensive free JavaScript course with daily coding challenges, perfect for beginners and experienced developers alike.',
  },
  {
    question: 'What makes this the best place to learn JavaScript?',
    answer:
      'Our JavaScript training combines structured learning with hands-on practice through daily challenges, real-time feedback, and a supportive developer community.',
  },
  {
    question: 'How long does the JavaScript course take?',
    answer:
      'Our course is self-paced and modular. You can learn the basics in a few weeks or dive deep into advanced JavaScript programming at your own pace.',
  },
  {
    question: 'What JavaScript resources are included?',
    answer:
      'You get access to comprehensive JavaScript tutorials, coding challenges, web development projects, and modern JavaScript frameworks training.',
  },
  {
    question: 'Can I track my JavaScript learning progress?',
    answer:
      'Yes, our platform provides detailed analytics to track your progress from JavaScript basics through advanced concepts and web application development.',
  },
  {
    question: 'Is this JavaScript course really free?',
    answer: (
      <>
        Yes, our JavaScript programming course is completely free. You can{' '}
        <Link href="/signup" className="text-accent">
          sign up
        </Link>{' '}
        and start learning JavaScript online today with no cost
      </>
    ),
  },
  {
    question: 'What is the best site to learn JavaScript?',
    answer:
      'TechBlitz is the best site to learn JavaScript. We offer a comprehensive free JavaScript course with daily coding challenges, perfect for beginners and experienced developers alike.',
  },
  {
    question: 'How can I receive recommendations straight to my inbox?',
    answer:
      'You can receive recommendations straight to your inbox by signing up for a free TechBlitz account, and opting into email notifications.',
  },
  {
    question: 'How can I get instant feedback on my code?',
    answer:
      'You can get instant feedback on your code by signing up for a TechBlitz account and upgrading to a premium plan. If you are a student, you are eligible for a 30% discount on a TechBlitz premium plan.',
  },
  {
    question: 'What coding topics can I learn on TechBlitz?',
    answer:
      'You can learn JavaScript, React, Git, and many other coding topics on TechBlitz. We are constantly adding new coding topics to our platform.',
  },
  {
    question: 'How can I get free JavaScript coding challenges?',
    answer:
      'You can get free JavaScript coding challenges by signing up for a TechBlitz account and opting into email notifications.',
  },
  {
    question: 'Do you offer project-based learning?',
    answer: (
      <>
        Currently, we do not offer project-based learning (yet 😉). But we have some blog posts that
        you can learn from. Check them out here
        <Link
          href="/javascript-projects-for-beginners/how-to-create-a-weather-app-in-javascript"
          className="text-accent"
        >
          here
        </Link>
      </>
    ),
  },
];

export default async function FeatureDailyQuestionPage() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: getBaseUrl(),
    headline: 'Free JavaScript Course & Daily Coding Challenges | TechBlitz',
    description:
      'Learn JavaScript programming with our free online course and daily coding challenges. Master web development with hands-on practice.',
    image:
      'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
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
          name: 'Daily Coding Challenges',
          item: `${getBaseUrl()}/features/daily-coding-challenges`,
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
      '@id': `${getBaseUrl()}/features/daily-coding-challenges`,
    },
    keywords:
      'javascript course, free javascript course, javascript online course, learn javascript online, javascript training, web development, javascript programming, html css and javascript, javascript frameworks, software development',
    publisher: {
      '@type': 'Organization',
      name: 'TechBlitz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://techblitz.dev/favicon.ico',
      },
    },
  };

  const userCount = await getUserCount();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <FeatureDailyChallengeHero
          header="Learn to code with daily coding challenges"
          subheader="TechBlitz transforms learning to code into bite-sized, engaging daily coding challenges. Master new skills in just 5 minutes a day—anytime, anywhere, on any device. Even learn to code on your phone!"
          className="xl:w-1/2"
        />
        <FeatureLeftRightSection
          leftHeader="Daily coding challenges for beginners"
          leftSubheader="TechBlitz transforms learning to code into bite-sized, engaging daily coding challenges. Master new skills in just 5 minutes a day—anytime, anywhere, on any device. Even learn to code on your phone!"
          rightHeader="Personalized daily coding challenges"
          rightSubheader="TechBlitz adapts to your weaknesses. Receive recommendations straight to your inbox, and get instant feedback on your code. Improving your coding skills has never been easier."
        />

        <QuestionMarquee
          header="Hundreds of web development coding challenges"
          subheader="Choose from hundreds of coding challenges to master your skills. From JavaScript to Git, we've got you covered."
          cta={true}
        />

        <MarketingContentGrid
          title="The best site to learn to code"
          subheading={`Discover why ${userCount}+ users choose TechBlitz to learn to code`}
          items={items}
        />

        <FAQsBlock faqs={faqs} />
        <CallToActionBlock
          title="Access free Daily Coding Challenges Today"
          description="Access our free JavaScript roadmaps and daily coding challenges. Perfect for aspiring web developers and software engineers."
        />
      </div>
    </>
  );
}
