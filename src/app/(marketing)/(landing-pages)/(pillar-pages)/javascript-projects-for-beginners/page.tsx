import FeatureLeftRightSection from '@/components/marketing/features/daily-challenge/feature-left-right/features-section';
import FeatureDailyChallengeHero from '@/components/marketing/features/daily-challenge/hero/daily-challenge-hero';
import FeatureRoadmapThreeGridBlock from '@/components/marketing/features/roadmap/roadmap-three-grid';
import StatsReportSection from '@/components/marketing/features/statistics/stats-report-section';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import MarketingContentGrid from '@/components/marketing/global/blocks/content-grid';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';
import type { WebPageJsonLd } from '@/types';
import { getBaseUrl } from '@/utils';
import { createMetadata } from '@/utils/seo';
import { MobileIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const faqs = [
  {
    question: 'What are the best free resources to learn JavaScript?',
    answer: (
      <>
        There are many excellent free resources to learn JavaScript:
        <ul className="list-disc pl-5 mt-2">
          <li>
            TechBlitz - Comprehensive JavaScript curriculum with interactive exercises.
            <Link href="/signup" className="text-accent underline">
              Try TechBlitz for free
            </Link>
            .
          </li>
          <li>freeCodeCamp - Comprehensive JavaScript curriculum with interactive exercises</li>
          <li>MDN Web Docs - Mozilla's detailed JavaScript documentation and tutorials</li>
          <li>JavaScript.info - Modern JavaScript tutorial from basics to advanced</li>
          <li>Codecademy - Free interactive JavaScript course for beginners</li>
          <li>W3Schools - Simple JavaScript tutorials with live code examples</li>
        </ul>
      </>
    ),
  },
  {
    question: 'What are some fun JavaScript projects for beginners?',
    answer:
      'There are many easy JavaScript projects to start with, like building a to-do list, calculator, weather app, or quiz game. These simple JavaScript projects help reinforce fundamental concepts like DOM manipulation, event handling, and basic data structures. As you progress with HTML, CSS and JavaScript projects, you can move on to more complex applications.',
  },
  {
    question: 'Where can I find the best JavaScript courses online?',
    answer: (
      <>
        TechBlitz offers a comprehensive JavaScript curriculum with interactive exercises.
        <Link href="/signup" className="text-accent underline">
          Try TechBlitz for free
        </Link>
        .
      </>
    ),
  },
  {
    question: 'How long does it take to complete beginner JS projects?',
    answer:
      'Basic JavaScript projects typically take 2-4 hours to complete. The time varies based on project complexity and your familiarity with HTML, CSS, and JavaScript concepts. Focus on understanding each step rather than rushing through the code.',
  },
  {
    question: 'What skills do I need before starting JavaScript practice projects?',
    answer: (
      <>
        Basic HTML and CSS knowledge is essential, along with understanding JavaScript fundamentals
        like variables, functions, and loops. If you need to strengthen these skills first,{' '}
        <Link href="/programming-challenges-for-beginners" className="text-accent underline">
          try some beginner programming challenges
        </Link>{' '}
        to build a strong foundation.
      </>
    ),
  },
  {
    question: 'What are the best websites to learn JavaScript programming?',
    answer: (
      <>
        Top websites for learning JavaScript include:
        <ul className="list-disc pl-5 mt-2">
          <li>
            TechBlitz - Comprehensive JavaScript curriculum with interactive exercises.
            <Link href="/signup" className="text-accent underline">
              Try TechBlitz for free
            </Link>
            .
          </li>
          <li>freeCodeCamp.org - Free certification courses</li>
          <li>MDN Web Docs - Comprehensive documentation and guides</li>
          <li>JavaScript.info - Modern JavaScript tutorials</li>
          <li>Codecademy - Interactive learning platform</li>
          <li>W3Schools - Beginner-friendly tutorials</li>
        </ul>
      </>
    ),
  },
  {
    question: 'What tools do I need for HTML, CSS, JS projects?',
    answer:
      'To get started with basic JavaScript projects, you only need a text editor (like VS Code or Sublime Text) and a web browser. As you advance to more complex JavaScript practice projects, you might want to add tools like Git for version control and Node.js for backend development.',
  },
  {
    question: 'How can I improve my JavaScript projects?',
    answer:
      "Focus on clean code organization, add error handling, implement responsive design, and include user-friendly features. Document your code well and consider adding extra functionality like data persistence or API integration once you've mastered simple JavaScript projects.",
  },
  {
    question: 'How do I structure HTML, CSS and JavaScript projects?',
    answer:
      'Start with a clear file organization: separate HTML, CSS, and JavaScript files. Break down your JavaScript code into modular functions, use meaningful variable names, and comment your code. This makes your projects easier to maintain and showcase to potential employers.',
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
    title: 'Free Learning Resources',
    description:
      'Access top-rated free JavaScript courses and tutorials from platforms like freeCodeCamp, MDN Web Docs, and JavaScript.info. Start learning with structured, beginner-friendly content.',
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
    title: 'Interactive Learning Platforms',
    description:
      'Learn through interactive coding platforms like Codecademy, Scrimba, and W3Schools. Practice JavaScript with hands-on exercises and real-time feedback.',
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
    title: 'Online Course Platforms',
    description:
      'Explore comprehensive JavaScript courses on platforms like Udemy, Coursera, and edX. Learn from industry experts with structured curriculum and project-based learning.',
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
    title: 'Documentation & Tutorials',
    description:
      'Access comprehensive JavaScript documentation and tutorials from MDN Web Docs and JavaScript.info. Learn best practices and modern development techniques.',
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
    title: 'Learning Path Progression',
    description:
      'Follow structured learning paths from beginner to advanced JavaScript. Start with free courses and progress to more complex programming concepts.',
  },
  {
    icon: <MobileIcon className="size-6" />,
    title: 'Community Learning Resources',
    description:
      'Join JavaScript learning communities on platforms like freeCodeCamp, Stack Overflow, and GitHub. Learn from peers and get help with your coding challenges.',
  },
];

// metadata
export async function generateMetadata() {
  return createMetadata({
    title: 'JavaScript Projects & Free Learning Resources for Beginners',
    description:
      'Discover free JavaScript courses, tutorials, and practical projects for beginners. Learn web development through hands-on coding examples and top-rated learning platforms. Perfect for starting your programming journey.',
    image: {
      text: 'JavaScript Projects & Learning Resources',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/javascript-projects-for-beginners',
  });
}

export default function JavascriptProjectsForBeginners() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/javascript-projects-for-beginners`,
    headline: 'JavaScript Projects & Free Learning Resources for Beginners',
    description:
      'Discover free JavaScript courses, tutorials, and practical projects for beginners. Learn web development through hands-on coding examples and top-rated learning platforms. Perfect for starting your programming journey.',
    image:
      'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${getBaseUrl()}` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'JavaScript Projects & Free Learning Resources for Beginners',
          item: `${getBaseUrl()}/javascript-projects-for-beginners`,
        },
      ],
    },
    author: {
      '@type': 'Organization',
      name: 'TechBlitz',
      url: `${getBaseUrl()}/javascript-projects-for-beginners`,
    },
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${getBaseUrl()}/javascript-projects-for-beginners`,
    },
    keywords:
      'javascript projects for beginners, free javascript course, best site to learn javascript, javascript tutorial, javascript programming classes, javascript resources, javascript programming course, where to learn javascript for free, html css js projects, simple javascript projects',
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
          header="JavaScript Projects & Free Learning Resources"
          subheader="Start your programming journey with free JavaScript courses and hands-on projects. Learn essential coding concepts through top-rated platforms while building real applications."
          animatedSpan="From tutorials to practical projects"
          className="xl:w-2/3"
          leftCta={{
            title: 'Programming Challenges for Beginners',
            href: '/javascript-projects-for-beginners/programming-challenges-for-beginners',
          }}
          rightCta={{
            title: 'Learn how to build a weather app',
            href: '/javascript-projects-for-beginners/how-to-create-a-weather-app-with-javascript',
          }}
        />

        <FeatureLeftRightSection
          leftHeader="Free JavaScript Learning Resources"
          leftSubheader="Access comprehensive JavaScript tutorials and courses from top platforms like freeCodeCamp, MDN Web Docs, and Codecademy. Learn at your own pace with interactive exercises and practical projects."
          learnMoreLink={true}
        />

        <FeatureRoadmapThreeGridBlock
          title="Structured Learning Path"
          description="Follow a clear progression from basic JavaScript concepts to advanced programming. Combine free courses with hands-on projects to build real-world development skills."
        />

        <StatsReportSection
          header="Track Your Learning Progress"
          subheader="Monitor your development journey as you complete courses and projects. Identify areas for improvement and celebrate your growing JavaScript expertise."
          learnMoreLink={true}
        />

        <QuestionMarquee
          header="From Beginner to JavaScript Developer"
          subheader="Access free resources and practical projects to build a strong foundation in web development. Learn from top educational platforms while creating real applications."
        />

        <MarketingContentGrid title="Free JavaScript Learning Resources" items={items} />

        <FAQsBlock faqs={faqs} />

        <CallToActionBlock
          title="Start Learning JavaScript Today"
          description="Begin your coding journey with free courses and practical projects that teach real-world development skills."
        />
      </div>
    </>
  );
}
