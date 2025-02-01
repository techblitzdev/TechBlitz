import { WebPageJsonLdBreadcrumb } from "@/utils/seo";

import { getBaseUrl } from "@/utils";
import { WebPageJsonLd } from "@/types/Seo";
import FAQsBlock from "@/components/marketing/global/blocks/faqs";
import CallToActionBlock from "@/components/marketing/global/blocks/call-to-action-block";
import Link from "next/dist/client/link";
import FeatureDailyChallengeHero from "@/components/marketing/features/daily-challenge/hero/daily-challenge-hero";
import FeatureRoadmapThreeGridBlock from "@/components/marketing/features/roadmap/roadmap-three-grid";
import QuestionMarquee from "@/components/marketing/global/blocks/question-marquee";
import Testimonials from "@/components/marketing/global/blocks/testimonials";
import FeatureLeftRightSectionOne from "@/components/marketing/features/daily-challenge/feature-left-right/section-one";
import MarketingContentGrid from "@/components/marketing/global/blocks/content-grid";

const faqs = [
  {
    question: "How will TechBlitz help me learn React?",
    answer:
      "Our challenges have been crafted to mimic real-world problems, that aim to guide you from a beginner React developer to a pro.",
  },
  {
    question: "What sort of React challenges are there?",
    answer:
      "We currently have a wide range of React challenges for you to complete. From beginner to advanced, including React Hooks, React context, React Router, and more. We are constantly adding new challenges to help you learn React.",
  },
  {
    question: "How will TechBlitz help me learn React?",
    answer:
      "Our challenges have been crafted to mimic real-world problems, that aim to guide you from a beginner React developer to a pro. We offer personalized challenges and roadmaps, in depth performance analytics, and more!",
  },
  {
    question: "What else can I do on TechBlitz?",
    answer:
      "TechBlitz is the best platform for you to learn web development. We offer a wide range of challenges, roadmaps, and more to help you learn JavaScript, React, Node, and more.",
  },
  {
    question: "What is TechBlitz?",
    answer:
      "TechBlitz is a coding challenge platform that helps you learn React.",
  },
  {
    question: "How does TechBlitz work?",
    answer:
      "TechBlitz works by providing you with a wide range of real-world React challenges with a focus on real-world problems.",
  },
  {
    question: "What makes TechBlitz different?",
    answer:
      "Our core values are in providing you a personalized experience. We ensure you learn essential coding skills faster than ever with your own AI-assistant, personalized challenges & roadmaps, stats tracking, and more!",
  },
  {
    question: "How do I get started?",
    answer: (
      <>
        You can get started by{" "}
        <Link href="/signup" className="text-accent underline">
          signing up for a free account
        </Link>{" "}
        and starting to answer challenges.
      </>
    ),
  },
  {
    question: "Do you offer student discount?",
    answer: "Yes! We are currently offering 50% off for students.",
  },
];

const items = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
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
    title: "React Progress Tracking",
    description:
      "Monitor your React learning journey with detailed analytics. Track your progress across components, hooks, state management, and other crucial React concepts.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
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
    title: "Progressive Learning",
    description:
      "Master React one concept at a time with our structured learning path. From React fundamentals to advanced patterns like hooks, context, and state management.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 12 12"
      >
        <path
          fill="currentColor"
          d="M5 2.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M6 7a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.55 5H2a1 1 0 0 0-1 1v.207c0 .596.343 1.086.797 1.407c.272.193.597.336.952.42c.269-.488.736-.85 1.292-.981A2.49 2.49 0 0 1 3.55 5m4.41 2.053a2 2 0 0 1 1.291.98c.355-.083.68-.226.952-.419c.454-.32.797-.811.797-1.407V6a1 1 0 0 0-1-1H8.45a2.51 2.51 0 0 1-.49 2.053M4.5 8a1 1 0 0 0-1 1v.167c0 .587.357 1.058.808 1.358C4.763 10.83 5.363 11 6 11s1.237-.171 1.692-.475c.45-.3.808-.771.808-1.358V9a1 1 0 0 0-1-1zM9 4a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
        />
      </svg>
    ),
    title: "Active Community",
    description:
      "Join thousands of React developers solving daily challenges. Share solutions, discuss best practices, and learn from peers tackling the same React coding challenges.",
  },
];

export default function ReactCodingChallengesPage() {
  const jsonLd: WebPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: getBaseUrl(),
    headline: "React Coding Challenges | TechBlitz",
    description:
      "TechBlitz provides a wide range of React coding challenges to help you improve your skills and learn new concepts.",
    image:
      "https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531",
    breadcrumb: WebPageJsonLdBreadcrumb,
    author: {
      "@type": "Organization",
      name: "TechBlitz",
      url: getBaseUrl(),
    },
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getBaseUrl(),
    },
    keywords:
      "learn to code, learn to code for free, learn react, react coding challenges, react coding challenges, web development, tech skills assessment, learn to code on phone",
    publisher: {
      "@type": "Organization",
      name: "TechBlitz",
      logo: {
        "@type": "ImageObject",
        url: "https://techblitz.dev/favicon.ico",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${getBaseUrl()}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
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
          header="Learning React Made Simple"
          subheader="Master React with ease. From just 10 minutes a day, to a full-time React developer. You will learn every React concept, from beginner to advanced."
          animatedSpan="Learn React effortlessly"
        />
        <div className="pb-20">
          <FeatureLeftRightSectionOne
            leftHeader="Daily React coding challenges"
            leftSubheader="Mastery React with ease. From just 10 minutes a day, to a full-time React developer. Our react challenges are designed to help you learn React faster than ever with real-world problems."
            learnMoreLink={true}
          />
        </div>
        <FeatureRoadmapThreeGridBlock
          title="React roadmaps for everyone"
          description="Every React roadmap is created based on your current coding skills. We analyze your current skills set, and are able to create a roadmap that is tailored to you. Meaning every user will be getting a unique experience with TechBlitz."
        />
        <MarketingContentGrid
          title="Save time, money and effort while learning React"
          subheading="Master React through hands-on practice with our interactive coding challenges. Build real-world knowledge while learning core concepts, hooks, state management, and modern React patterns."
          items={items}
        />
        <div className="pb-20">
          <Testimonials />
        </div>
        <QuestionMarquee
          header="React coding questions for everyone."
          subheader="A wide range of React coding questions to choose from, from your first challenge to first job."
        />
        <FAQsBlock faqs={faqs} />
        <CallToActionBlock
          title="Learning React Made Simple"
          description="TechBlitz is the number one place to learn React. Bringing you new React coding challenges every day."
        />
      </div>
    </>
  );
}
