import FeatureLeftRightSection from '@/components/marketing/features/daily-challenge/feature-left-right/features-section';
import FeatureRoadmapThreeGridBlock from '@/components/marketing/features/roadmap/roadmap-three-grid';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import MarketingContentGrid, {
  MarketingContentGridProps,
} from '@/components/marketing/global/blocks/content-grid';
import FAQsBlock, { FAQ } from '@/components/marketing/global/blocks/faqs';
import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';
import PseoHero from '@/components/marketing/pseo/hero';
import { getBaseUrl } from '@/utils';
import { QUESTIONS_COUNT } from '@/utils/constants';
import { getPseoData } from '@/utils/data/misc/get-pseo-data';
import { createMetadata, WebPageJsonLdBreadcrumb } from '@/utils/seo';
import { MobileIcon } from '@radix-ui/react-icons';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  return createMetadata({
    title: `Learn how to use ${params.slug.join('/')} in JavaScript`,
    description: `Discover the ultimate JavaScript cheat sheet with TechBlitz. Learn JavaScript syntax, best practices, and tips to become a pro developer. Perfect for beginners and advanced coders alike.`,
  });
}

const createJsonLd = (title: string, description: string, slug: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/${slug}`,
    headline: title,
    description: description,
    image:
      'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
    breadcrumb: WebPageJsonLdBreadcrumb,
    author: {
      '@type': 'Organization',
      name: 'TechBlitz',
      url: `${getBaseUrl()}/${slug}`,
    },
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${getBaseUrl()}/${slug}`,
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
};

const defaultMarketingContent = [
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
      'Master complex JavaScript concepts in just 15 minutes a day with our expertly crafted micro-challenges. Perfect for busy developers.',
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
      'Daily coding challenges to improve your JavaScript skills. Learn to code for free, with our short-form, interactive coding challenges from a range of topics including JavaScript, React, Node.js, web development, and more.',
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
    title: 'Vibrant JavaScript Community',
    description:
      'Connect with a community of passionate JavaScript developers worldwide. Share solutions, discuss approaches, and accelerate your learning through peer collaboration.',
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
      'Get real-time feedback on your JavaScript solutions. Learn from mistakes and improve faster.',
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
  {
    icon: <MobileIcon className="size-6" />,
    title: 'Seamless Mobile Learning',
    description:
      'Learn JavaScript on your phone. Practice during commutes or breaks with our optimized mobile interface - never miss a day of learning.',
  },
];

const defaultFAQs = [
  {
    question: 'How will TechBlitz help me learn JavaScript?',
    answer:
      'Our challenges have been crafted to mimic real-world problems, that aim to guide you from a beginner JavaScript developer to a pro.',
  },
  {
    question: 'How many JavaScript questions are there for me to complete?',
    answer: `We currently have ${QUESTIONS_COUNT}+ JavaScript challenges for you to complete. One for each level of JavaScript mastery.`,
  },
  {
    question: 'What is TechBlitz?',
    answer: 'TechBlitz is a coding challenge platform that helps you learn JavaScript.',
  },
  {
    question: 'How does TechBlitz work?',
    answer:
      'TechBlitz works by providing you with a wide range of real-world JavaScript challenges.',
  },
  {
    question: 'What makes TechBlitz different?',
    answer:
      'Our core values are in providing you a personalized experience. We ensure you learn essential coding skills faster than ever with your own AI-assistant, personalized challenges & roadmaps, stats tracking, and more!',
  },
  {
    question: 'How do I get started?',
    answer:
      'You can get started by signing up for a free account and starting to answer challenges.',
  },
  {
    question: 'Do you offer student discount?',
    answer: 'Yes! We are currently offering 30% off for students.',
  },
];

/**
 * A marketing landing page template that will be used to
 * target long-tail keywords that are not competitive (pSeo)
 *
 * @param param - The slug of the page to render
 */
export default async function Page({ params }: { params: { slug: string[] } }) {
  // Join the slug array to create the path
  const slugPath = params.slug ? `/${params.slug.join('/')}` : '';

  const pseoData = await getPseoData(slugPath);

  if (pseoData?.isPublished === false) {
    notFound();
  }

  if (!pseoData) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            createJsonLd(
              'Learn how to use Arrays in JavaScript',
              'Discover the ultimate JavaScript cheat sheet with TechBlitz. Learn JavaScript syntax, best practices, and tips to become a pro developer. Perfect for beginners and advanced coders alike.',
              slugPath
            )
          ),
        }}
      />
      <div className="container">
        <PseoHero
          header={pseoData.heroHeader}
          subheader={pseoData.heroSubheader}
          className="xl:w-2/3"
        />

        <FeatureLeftRightSection
          leftHeader={pseoData.leftHeader}
          leftSubheader={pseoData.leftSubheader}
          learnMoreLink={pseoData.learnMoreLink}
        />

        <FeatureRoadmapThreeGridBlock
          title={pseoData.roadmapTitle}
          description={pseoData.roadmapDescription}
        />

        <QuestionMarquee header={pseoData.questionHeader} subheader={pseoData.questionSubheader} />

        {pseoData.contentGridItems ? (
          <MarketingContentGrid
            title={pseoData.contentGridTitle}
            items={pseoData.contentGridItems as unknown as MarketingContentGridProps[]}
          />
        ) : (
          <MarketingContentGrid title={pseoData.contentGridTitle} items={defaultMarketingContent} />
        )}

        {pseoData.faqs ? (
          <FAQsBlock faqs={pseoData.faqs as unknown as FAQ[]} />
        ) : (
          <FAQsBlock faqs={defaultFAQs} />
        )}

        <CallToActionBlock title={pseoData.ctaTitle} description={pseoData.ctaDescription} />
      </div>
    </>
  );
}
