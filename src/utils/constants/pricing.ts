import { UserRecord } from '@/types/User';
import { QUESTIONS_COUNT } from './misc';

export const getPlans = (user: UserRecord | null) => [
  {
    id: 'free',
    name: 'Free',
    currencySymbol: '$',
    price: 0,
    frequency: 'forever',
    frequencyText: 'forever',
    features: [
      {
        name: 'Daily question',
      },
      {
        name: 'Compete with other users everyday',
      },
      {
        name: `Access to 250+ Javascript, React, Node and Web Development questions (more added daily!)`,
      },
      {
        name: 'View leaderboards and compete with other users',
      },
      {
        name: 'Basic stats and progress tracking',
      },
      {
        name: 'Basic support',
      },
    ],
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
      local: `https://buy.stripe.com/test_8wMfZ07x02DraeQ289?client_reference_id=${user?.uid}`,
      production: `https://buy.stripe.com/bIY3dG4Es6z65fq4gk?client_reference_id=${user?.uid}`,
    },
    price: 4.99,
    currencySymbol: '$',
    frequency: 'month',
    frequencyText: 'per month, billed monthly',
    features: [
      {
        name: 'Daily question',
      },
      {
        name: 'Compete with other users everyday',
      },
      {
        name: `Access to ${QUESTIONS_COUNT}+ Javascript, React, Node and Web Development questions (more added daily!)`,
      },
      {
        name: 'View leaderboards and compete with other users',
      },
      {
        name: 'In depth stat analysis and progress tracking',
      },
      {
        name: '10 Bespoke learning plans and progression frameworks',
      },
      {
        name: 'Custom coding questions',
      },
      {
        name: 'Access to upcoming beta features',
      },
      {
        name: '50% student discount available',
      },
      {
        name: 'Priority support',
      },
    ],
    cta: {
      text: user?.userLevel === 'PREMIUM' ? 'Current plan' : 'Get started',
      href: {
        local: `https://buy.stripe.com/test_8wMfZ07x02DraeQ289?client_reference_id=${user?.uid}`,
        production: `https://buy.stripe.com/bIY3dG4Es6z65fq4gk?client_reference_id=${user?.uid}`,
      },
    },
    mostPopular: false,
    disabled: user?.userLevel === 'PREMIUM',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 39.99,
    currencySymbol: '$',
    frequency: 'once',
    frequencyText: 'pay once, yours forever',
    features: [
      {
        name: 'Daily question',
      },
      {
        name: 'Compete with other users everyday',
      },
      {
        name: `Access to 250+ Javascript, React, Node and Web Development questions (more added daily!)`,
      },
      {
        name: 'View leaderboards and compete with other users',
      },
      {
        name: 'In depth stat analysis and progress tracking',
      },
      {
        name: '10 Bespoke learning plans and progression frameworks',
      },
      {
        name: 'Access to upcoming beta features',
      },
      {
        name: 'Custom coding questions',
      },
      {
        name: 'Priority support',
      },
      {
        name: '50% student discount available',
      },
      {
        name: 'Lifetime access to all features',
      },
    ],
    paymentLink: {
      local: `https://buy.stripe.com/cN229C4Es4qY5fqdQV?client_reference_id=${user?.uid}`,
      production: `https://buy.stripe.com/cN229C4Es4qY5fqdQV?client_reference_id=${user?.uid}`,
    },
    cta: {
      text: user?.userLevel === 'PREMIUM' ? 'Current plan' : 'Get started',
      href: {
        local: `https://buy.stripe.com/cN229C4Es4qY5fqdQV?client_reference_id=${user?.uid}`,
        production: `https://buy.stripe.com/cN229C4Es4qY5fqdQV?client_reference_id=${user?.uid}`,
      },
    },
    mostPopular: true,
  },
];

export type Plan = ReturnType<typeof getPlans>[number];
