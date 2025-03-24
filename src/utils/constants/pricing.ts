import { UserRecord } from '@/types/User';
import { QUESTIONS_COUNT } from './misc';

export type FeatureSection = {
  name: string;
  description: string;
  free: boolean;
  premium: boolean;
  lifetime: boolean;
};

export type FeatureList = {
  [key: string]: {
    title: string;
    features: FeatureSection[];
  };
};

export const entireFeatureList: FeatureList = {
  questions: {
    title: 'Questions & Challenges',
    features: [
      {
        name: `${QUESTIONS_COUNT}+ free questions`,
        description: 'Get a new challenge every day',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Multiple choice questions',
        description: 'Multiple choice questions',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Code editor questions',
        description: 'Code editor questions',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Suggested question emails',
        description: 'Get a new challenge every day',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Complete daily missions',
        description: 'Complete daily missions',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Access to premium questions',
        description: 'Access to advanced and specialized questions',
        free: false,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Generate custom coding challenges',
        description: 'Generate custom coding challenges',
        free: false,
        premium: true,
        lifetime: true,
      },
    ],
  },
  studyPlans: {
    title: 'Roadmaps & Progress',
    features: [
      {
        name: 'Basic roadmaps',
        description: 'Access to standard roadmaps',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Roadmap progress tracking',
        description: 'Track your roadmap progress',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Roadmap goals',
        description: 'Set and track your roadmap goals (coming soon)',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Bespoke roadmaps',
        description: 'Personalized roadmaps tailored to your goals',
        free: false,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Access to premium roadmaps (coming soon)',
        description: 'Access to premium roadmaps',
        free: false,
        premium: true,
        lifetime: true,
      },
    ],
  },
  stats: {
    title: 'Statistics and reports',
    features: [
      {
        name: 'Basic progress tracking',
        description: 'Track your daily progress',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Generate coding reports',
        description: 'Generate coding reports',
        free: false,
        premium: true,
        lifetime: true,
      },
    ],
  },
  aiAssistant: {
    title: 'AI Assistant',
    features: [
      {
        name: 'AI tokens',
        description: 'Credits for AI-powered assistance',
        free: false,
        premium: true,
        lifetime: true,
      },
      {
        name: 'AI-powered question support',
        description: 'AI-powered question support',
        free: false,
        premium: true,
        lifetime: true,
      },
      {
        name: 'AI-powered answer support',
        description: 'AI-powered answer support',
        free: false,
        premium: true,
        lifetime: true,
      },
    ],
  },
  support: {
    title: 'Support & Updates',
    features: [
      {
        name: 'Basic support',
        description: 'Email support for basic issues',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Priority support',
        description: 'Fast-track support with priority response',
        free: false,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Beta features access',
        description: 'Early access to upcoming features',
        free: false,
        premium: true,
        lifetime: true,
      },
    ],
  },
};

export const getPlans = (
  user: Partial<UserRecord> | null,
  hideFree: boolean = false,
  billingPeriod: 'month' | 'year' = 'month'
) => {
  const plans = [
    !hideFree && {
      id: 'free',
      name: 'Free',
      currencySymbol: '$',
      price: 0,
      frequency: 'forever',
      frequencyText: 'forever',
      shortText: 'Great for beginners wanting to get started with coding.',
      features: [
        {
          name: 'A coding challenge picked just for you sent straight to your inbox',
        },
        { name: 'Access to study plans and progression frameworks' },
        {
          name: `Access to ${QUESTIONS_COUNT}+ Javascript, React, Node and Web Development multiple choice and code editor challenges (more added daily!)`,
        },
        { name: 'View leaderboards and compete with other users' },
        { name: 'Basic stats and progress tracking' },
        { name: 'Basic support' },
      ],
      compactFeatures: [
        { name: 'Compete with other users everyday' },
        { name: 'Basic stats and progress tracking' },
        { name: 'Basic support' },
      ],
      entireFeatureList,
      cta: {
        text: user?.userLevel === 'FREE' ? 'Current plan' : 'Get started',
        href: '/signup',
      },
      mostPopular: false,
      disabled: user?.userLevel === 'FREE',
    },
    {
      id: 'premium',
      name: 'Premium',
      paymentLink: {
        local:
          billingPeriod === 'month'
            ? `https://buy.stripe.com/14k15yef2bTqcHS4gr?client_reference_id=${user?.uid}`
            : `https://buy.stripe.com/28o8y0gna9LigY828k?client_reference_id=${user?.uid}`,
        production:
          billingPeriod === 'month'
            ? `https://buy.stripe.com/14k15yef2bTqcHS4gr?client_reference_id=${user?.uid}`
            : `https://buy.stripe.com/28o8y0gna9LigY828k?client_reference_id=${user?.uid}`,
      },
      price: billingPeriod === 'month' ? 5.99 : 4.99,
      currencySymbol: '$',
      frequency: billingPeriod,
      frequencyText:
        billingPeriod === 'month' ? 'per month, billed monthly' : 'per month, billed yearly',
      shortText: 'Perfect for those looking for a more personalized coding experience.',
      features: [
        { name: 'Access to premium questions' },
        {
          name: 'Enhanced question suggestions',
        },
        { name: 'In depth stat analysis and progress tracking' },
        { name: '15 personalized roadmaps tailored to your goals every month' },
        { name: 'Personalized coding challenges' },
        { name: 'Unlimited AI assistant tokens' },
        { name: 'Access to upcoming beta features' },
        { name: 'Priority support' },
      ],
      compactFeatures: [
        { name: 'Access to premium questions' },
        { name: '15 personalized roadmaps tailored to your goals every month' },
        { name: 'In depth stat analysis and progress tracking' },
        { name: 'Personalized coding challenges' },
        { name: 'Unlimited AI assistant tokens' },
      ],
      entireFeatureList,
      cta: {
        text: user?.userLevel === 'PREMIUM' ? 'Current plan' : 'Get started',
        href: {
          local:
            billingPeriod === 'month'
              ? `https://buy.stripe.com/14k15yef2bTqcHS4gr?client_reference_id=${user?.uid}`
              : `https://buy.stripe.com/28o8y0gna9LigY828k?client_reference_id=${user?.uid}`,
          production:
            billingPeriod === 'month'
              ? `https://buy.stripe.com/14k15yef2bTqcHS4gr?client_reference_id=${user?.uid}`
              : `https://buy.stripe.com/28o8y0gna9LigY828k?client_reference_id=${user?.uid}`,
        },
      },
      mostPopular: false,
      disabled: user?.userLevel === 'PREMIUM',
    },
    /**
     * Lifetime plan
     */
    {
      id: 'price_1QoOikCX23ptLp4LTks1YO7V',
      name: 'Lifetime',
      price: 94.99,
      originalPrice: 149,
      chip: 'Save $40!',
      currencySymbol: '$',
      frequency: 'once',
      frequencyText: 'pay once, yours forever',
      shortText: 'Access to all features and future updates!',
      features: [
        { name: 'Access to premium questions' },
        {
          name: 'Enhanced question suggestions',
        },
        { name: 'In depth stat analysis and progress tracking' },
        { name: '25 personalized roadmaps tailored to your goals' },
        { name: 'Personalized coding challenges' },
        { name: '500 AI assistant tokens' },
        { name: 'Access to upcoming beta features' },
        { name: 'Priority support' },
        { name: 'Lifetime access to all features' },
      ],
      compactFeatures: [
        { name: 'Access to premium questions' },
        { name: '25 personalized roadmaps tailored to your goals' },
        { name: 'In depth stat analysis and progress tracking' },
        { name: 'Personalized coding challenges' },
        { name: '500 AI assistant tokens' },
        { name: 'Lifetime access to all features and future updates!' },
      ],
      entireFeatureList,
      paymentLink: {
        local: `https://buy.stripe.com/14kcOg1sgcXudLW28n?client_reference_id=${user?.uid}`,
        production: `https://buy.stripe.com/14kcOg1sgcXudLW28n?client_reference_id=${user?.uid}`,
      },
      cta: {
        text: user?.userLevel === 'PREMIUM' ? 'Current plan' : 'Get started',
        href: {
          local: `https://buy.stripe.com/14kcOg1sgcXudLW28n?client_reference_id=${user?.uid}`,
          production: `https://buy.stripe.com/14kcOg1sgcXudLW28n?client_reference_id=${user?.uid}`,
        },
      },
      mostPopular: false,
    },
  ];

  return plans;
};

export type Plan = ReturnType<typeof getPlans>[number];
