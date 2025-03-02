import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
//import { AnimatedBreak } from '@/components/marketing/pricing/animated-break';
import PricingCardBlock from '@/components/marketing/pricing/pricing-card-block';
import { createMetadata } from '@/utils/seo';
import Link from 'next/link';
import FrequencyToggle from '@/components/shared/payment/frequency-toggle';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import Testimonials from '@/components/marketing/global/blocks/testimonials';
import PricingTable from '@/components/marketing/pricing/pricing-table';
import StudentDiscountBlock from '@/components/marketing/pricing/student-discount';

export async function generateMetadata() {
  return createMetadata({
    title: 'Pricing | TechBlitz',
    description:
      'Start for free and unlock premium features with our affordable plans to help you become a better developer.',
    image: {
      text: 'Pricing | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    keywords: [
      'coding',
      'subscription',
      'affordable',
      'premium',
      'free coding courses',
      'most popular',
      'software',
      'Javascript course',
      'development',
    ],
    canonicalUrl: '/pricing',
  });
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'techblitz SaaS Platform',
  description:
    'techblitz is an online platform that helps users enhance their development knowledge through interactive questions and quizzes.',
  brand: {
    '@type': 'Brand',
    name: 'techblitz',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Free Plan',
      price: '0',
      priceCurrency: 'USD',
      description:
        'Access to all coding questions and daily challenges, leaderboards, statistics and more.',
      url: 'https://techblitz.dev/pricing',
      category: 'Free',
    },
    {
      '@type': 'Offer',
      name: 'Pro Plan',
      price: '5.99',
      priceCurrency: 'USD',
      description: 'Unlock all questions, daily challenges, and personalized AI roadmaps.',
      url: 'https://techblitz.dev/pricing',
      category: 'Paid',
    },
    {
      '@type': 'Offer',
      name: 'Lifetime Access',
      price: '89.99',
      priceCurrency: 'USD',
      description:
        'Unlock all questions, daily challenges, and personalized AI roadmaps. Lifetime access.',
      url: 'https://techblitz.dev/pricing',
      category: 'Paid',
    },
  ],
  url: 'https://techblitz.dev/pricing',
  image:
    'https://opengraph.b-cdn.net/production/images/cd5047e6-d495-4666-928e-37d9e52e1806.png?token=hJkK0Ghd13chZ2eBfAOxNQ8ejBMfE_oTwEuHkvxu9aQ&height=667&width=1200&expires=33269844531',
};

async function updateFrequency(frequency: 'month' | 'year') {
  'use server';
  cookies().set('billing_frequency', frequency);
  revalidatePath('/pricing');
}

export default async function PricingPage() {
  const cookieStore = cookies();

  const faqs = [
    {
      question: 'Can I use TechBlitz for free?',
      answer: (
        <>
          Absolutely! TechBlitz offers a free plan to get you started right away.{' '}
          <Link href="/signup" className="text-accent">
            Sign up for a free account
          </Link>{' '}
          and dive into our rich library of developer resources today. Upgrade to a paid plan to
          unlock all our features at any time.
        </>
      ),
    },
    {
      question: 'What is TechBlitz, and how can it help developers?',
      answer:
        'TechBlitz is an innovative online learning platform designed for developers of all skill levels. Our tools, including quizzes, coding roadmaps, and tutorials, help you sharpen your skills, boost productivity, and stay ahead in the tech industry.',
    },
    {
      question: 'What makes TechBlitz different from other coding platforms?',
      answer:
        'TechBlitz stands out by offering concise, interactive coding challenges that are both fun and educational. Our platform is designed to be a quick and efficient way to improve your skills, without the need for extensive tutorials or long-form content.',
    },
    {
      question: 'What is the AI assistant?',
      answer:
        "The AI assistant is your own personal coding assistant that can give you tips and guidance to answer our challenges. Struggling to answer a question? Ask the AI assistant for help. Don't understand an answer? Ask the AI assistant for help!",
    },
    {
      question: 'What are the key benefits of using TechBlitz?',
      answer: (
        <>
          TechBlitz provides engaging, short-form coding questions and practical roadmaps to help
          developers enhance their skills and tackle real-world challenges. We aim to improve your
          skills as a developer by only 10 minutes a day. You can check out our study paths{' '}
          <Link href={`/questions/explore`} className="text-accent">
            here
          </Link>{' '}
          to get a taste of what we offer.
        </>
      ),
    },
    {
      question: 'How can I get started with TechBlitz?',
      answer: (
        <>
          It’s easy!{' '}
          <Link href="/signup" className="text-accent">
            Sign up for a free account
          </Link>{' '}
          . Ready to take your skills to the next level? Upgrade to a paid plan and unlock all our
          features.
        </>
      ),
    },
    {
      question: 'What is the refund policy?',
      answer: (
        <>
          You can get a refund within 14 days of your purchase. Please contact us at{' '}
          <Link href="mailto:team@techblitz.dev" className="text-accent">
            team@techblitz.dev
          </Link>{' '}
          to request a refund.
        </>
      ),
    },
    {
      question: 'Do you offer any discounts?',
      answer: (
        <>
          Yes! We believe that TechBlitz should be available to all students. To claim your
          discount, please email us at{' '}
          <a href="mailto:team@techblitz.dev" className="text-accent">
            team@techblitz.dev
          </a>{' '}
          using your student email address. We are currently running a limited time, 50% discount
          for students. This will be available until the end of February 2025, after which the
          discount will be 30% off.
        </>
      ),
    },
    {
      question: 'I have more questions, how can I contact you?',
      answer: (
        <>
          Please contact us at{' '}
          <Link href="mailto:team@techblitz.dev" className="text-accent">
            team@techblitz.dev
          </Link>{' '}
          and we will get back to you as soon as possible.
        </>
      ),
    },
  ];

  const billingPeriod = (cookieStore.get('billing_frequency')?.value as 'month' | 'year') || 'year';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center min-h-screen container flex flex-col">
        <div className="flex flex-col gap-y-2 items-center pb-16 pt-28 md:pb-20 md:pt-32 xl:pt-40 xl:pb-32 max-w-7xl mx-auto">
          <div className="group w-fit relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-hidden focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Pricing
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-onest! font-medium! leading-[1.1]! text-gradient from-white to-white/75">
            {/** Plans that don't <AnimatedBreak /> the bank */}
            Learning to code has <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-accent to-accent/55">
              never{' '}
            </span>{' '}
            been easier
          </h1>
          <p className="text-gray-400 max-w-xl">
            Make learning to code a breeze with our affordable pricing plans. Start for free and
            upgrade to unlock a world of personalization.
          </p>
          <FrequencyToggle initialFrequency={billingPeriod} onFrequencyChange={updateFrequency} />
          <div className="my-10">
            <PricingCardBlock frequency={billingPeriod} />
          </div>

          <div className="mt-28 mb-14 w-full">
            <StudentDiscountBlock />
          </div>

          <div className="mt-28 mb-14 w-full">
            <PricingTable />
          </div>
        </div>

        <div className="mt-10 mb-28">
          <Testimonials header="Loved by developers just like you" />
        </div>

        <FAQsBlock faqs={faqs} />

        <CallToActionBlock title="Your dream career in tech is a click away" />
      </div>
    </>
  );
}
