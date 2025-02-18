import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import Link from 'next/link';
import { createMetadata } from '@/utils/seo';
import { FaqJsonLd } from '@/types/Seo';

export async function generateMetadata() {
  return createMetadata({
    title: 'Frequently Asked Questions | TechBlitz',
    description: 'Got a question? We have an answer.',
    image: {
      text: 'Frequently Asked Questions | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/faqs',
  });
}

const commonFaqs = [
  {
    question: 'What is techblitz?',
    answer:
      'TechBlitz is an online platform that helps developers of all abilities to learn and grow. We offer a range of tools and resources to help you become a better developer, including questions, roadmaps, tutorials, and more.',
    jsonLdText:
      'TechBlitz is an online platform that helps developers of all abilities to learn and grow. We offer a range of tools and resources to help you become a better developer, including questions, roadmaps, tutorials, and more.',
  },
  {
    question: 'Is techblitz open source?',
    answer: (
      <>
        Yes! TechBlitz is open source. You can find our source{' '}
        <a href="https://git.new/blitz" target="_blank" className="text-accent">
          here
        </a>
        .
      </>
    ),
    jsonLdText: 'Yes! TechBlitz is open source. You can find our source here.',
  },
  {
    question: 'Is techblitz free to use?',
    answer:
      'Yes, TechBlitz will be free to use. You will be able to sign up for a free account and start using our software right away.',
    jsonLdText:
      'Yes, TechBlitz will be free to use. You will be able to sign up for a free account and start using our software right away.',
  },
  {
    question: 'What will you be adding to techblitz in the future?',
    answer: (
      <>
        We are always working on new features and improvements to TechBlitz. You can find our
        roadmap{' '}
        <a href="/roadmap" className="text-accent">
          here
        </a>
        . Feel free to reach out to us with any feature requests or suggestions you may have.
      </>
    ),
    jsonLdText:
      'We are always working on new features and improvements to TechBlitz. You can find our roadmap here.',
  },
  {
    question: 'What are the benefits of using techblitz?',
    answer: 'We offer short-form questions on various topics to help you learn and grow.',
    jsonLdText: 'We offer short-form questions on various topics to help you learn and grow.',
  },
  {
    question: 'How do I get started with techblitz?',
    answer: (
      <>
        To get started with TechBlitz, simply sign up for a free account. You can sign up{' '}
        <Link href="/signup" className="text-accent">
          here
        </Link>
        .
      </>
    ),
    jsonLdText:
      'To get started with TechBlitz, simply sign up for a free account. You can sign up here.',
  },
  {
    question: 'Can I contribute to techblitz?',
    answer: (
      <>
        Yes! You can contribute to TechBlitz by submitting a pull request on our{' '}
        <a href="https://git.new/blitz" target="_blank" className="text-accent">
          GitHub repository
        </a>
        .
      </>
    ),
    jsonLdText:
      'Yes! You can contribute to TechBlitz by submitting a pull request on our GitHub repository.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'Yes, you can get a refund within 14 days of your purchase. ',
    jsonLdText: 'Yes, you can get a refund within 14 days of your purchase. ',
  },
  {
    question: 'My question is not listed here. How can I get in touch with you?',
    answer: (
      <>
        If you have any other questions, feel free to reach out to us at{' '}
        <a href="mailto:team@techblitz.dev" className="text-accent">
          team@techblitz.dev
        </a>
        .
      </>
    ),
    jsonLdText:
      'If you have any other questions, feel free to reach out to us at team@techblitz.dev.',
  },
  {
    question: 'Do you offer a student discount?',
    answer: (
      <>
        Yes! We believe that TechBlitz should be available to all students. To claim your 30%
        lifetime discount, please email us at{' '}
        <a href="mailto:team@techblitz.dev" className="text-accent">
          team@techblitz.dev
        </a>{' '}
        using your student email address.
      </>
    ),
    jsonLdText:
      'Yes! We believe that TechBlitz should be available to all students. To claim your discount, please email us at team@techblitz.dev using your student email address.',
  },
];

const planFaqs = [
  {
    question: 'What is the difference between the free and paid plans?',
    answer: (
      <>
        Our premium plans offer additional features and benefits, such as
        <a href="/features/roadmaps" className="text-accent">
          ai-powered roadmaps
        </a>{' '}
        , more in-depth analytics, priority support and early access to new features.'
      </>
    ),
  },
  {
    question: 'How do I upgrade my plan?',
    answer: 'You can upgrade your plan at any time by visiting your account settings.',
  },
  {
    question: 'Can I cancel my plan at any time?',
    answer:
      'Yes, you can cancel your plan at any time. Your plan will remain active until the end of your billing cycle.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards, as well as PayPal.',
  },
  {
    question: 'Do you offer a discount for students plans?',
    answer: (
      <>
        Yes, we offer a 30% discount for students. To claim your discount, please email us at{' '}
        <a href="mailto:team@techblitz.dev" className="text-accent">
          team@techblitz.dev
        </a>{' '}
        using your student email address.
      </>
    ),
  },
];

const userRoadmapsFaqs = [
  {
    question: 'What are user roadmaps?',
    answer:
      'User roadmaps are personalized learning paths that help you build upon your existing skills and knowledge in coding.',
  },
  {
    question: 'How do I create a user roadmap?',
    answer: 'You can create a user roadmap by heading over to the roadmap page in your dashboard.',
  },
  {
    question: 'Can I share my user roadmap with others?',
    answer: (
      <>
        No, currently you cannot share your roadmap with other users. However, we are working on
        adding this feature in the future. You can find our roadmap{' '}
        <a
          href="https://github.com/users/Logannford/projects/5?pane=issue&itemId=91140395"
          className="text-accent"
          target="_blank"
        >
          here
        </a>
        .
      </>
    ),
  },
  {
    question: 'Can I create multiple user roadmaps?',
    answer: 'Yes, you can create multiple user roadmaps to track different learning goals.',
  },
  {
    question: 'Can I delete a user roadmap?',
    answer: 'Yes, you can delete a user roadmap at any time by visiting your account settings.',
  },
];

export default function FAQsPage() {
  const faqJsonLd: FaqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: commonFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.jsonLdText,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="pt-32 pb-24 md:pb-20 md:pt-32 xl:pt-40 xl:pb-32">
        <div className="flex flex-col gap-y-10">
          <FAQsBlock
            title="Most commonly asked questions"
            description="Got a question? We have an answer. Here are some of the most commonly asked questions about techblitz."
            faqs={commonFaqs}
          />
          <FAQsBlock title="Questions about our plans" faqs={planFaqs} showSpan={false} />
          <FAQsBlock title="Coding Roadmaps" faqs={userRoadmapsFaqs} showSpan={false} />
        </div>
        <CallToActionBlock title="The smarter way to stay on top of tech" />
      </div>
    </>
  );
}
