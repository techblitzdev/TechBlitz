import { UserRecord } from '@/types/User';

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
        name: 'Compete with other users Daily question',
      },
      {
        name: 'Compete with other users Daily question',
      },
      {
        name: 'Stats and progress tracking',
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
      local: 'https://buy.stripe.com/test_8wMfZ07x02DraeQ289',
      production: 'https://buy.stripe.com/bIY3dG4Es6z65fq4gk ',
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
        name: 'Access to 1000+ of questions',
      },
      {
        name: 'In depth stats and progress tracking',
      },
      {
        name: "Top user's entered into weekly prize draws",
      },
      {
        name: 'Bespoke learning plans and progression frameworks',
      },
      {
        name: 'Access to upcoming beta features',
      },
      {
        name: 'Priority support',
      },
    ],
    cta: {
      text: user?.userLevel === 'PREMIUM' ? 'Current plan' : 'Get started',
      href: {
        local: 'https://buy.stripe.com/test_8wMfZ07x02DraeQ289',
        production: 'https://buy.stripe.com/bIY3dG4Es6z65fq4gk ',
      },
    },
    mostPopular: false,
    disabled: user?.userLevel === 'PREMIUM',
  },
];

export type Plan = ReturnType<typeof getPlans>[number];
