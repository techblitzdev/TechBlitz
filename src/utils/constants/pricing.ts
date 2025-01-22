import { UserRecord } from '@/types/User';
import { QUESTIONS_COUNT } from './misc';

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
      features: [
        { name: 'Daily coding challenge sent straight to your inbox' },
        { name: 'Compete with other users everyday' },
        {
          name: `Access to ${QUESTIONS_COUNT}+ Javascript, React, Node and Web Development multiple choice and code editor challenges (more added daily!)`,
        },
        { name: 'View leaderboards and compete with other users' },
        { name: 'Basic stats and progress tracking' },
        { name: '20 AI question help tokens' },
        { name: 'Basic support' },
      ],
      compactFeatures: [
        { name: 'Compete with other users everyday' },
        { name: 'Basic stats and progress tracking' },
        { name: '20 AI question help tokens' },
        { name: 'Basic support' },
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
        local:
          billingPeriod === 'month'
            ? `https://buy.stripe.com/eVabKc0oc0aI23e28e?client_reference_id=${user?.uid}`
            : `https://buy.stripe.com/3cs4hKgna7DagY814d?client_reference_id=${user?.uid}`,
        production:
          billingPeriod === 'month'
            ? `https://buy.stripe.com/eVabKc0oc0aI23e28e?client_reference_id=${user?.uid}`
            : `https://buy.stripe.com/3cs4hKgna7DagY814d?client_reference_id=${user?.uid}`,
      },
      price: billingPeriod === 'month' ? 3.99 : 3.33,
      currencySymbol: '$',
      frequency: billingPeriod,
      frequencyText:
        billingPeriod === 'month'
          ? 'per month, billed monthly'
          : 'per month, billed yearly',
      features: [
        {
          name: 'Enhanced question suggestions',
        },
        { name: 'In depth stat analysis and progress tracking' },
        { name: '10 Bespoke learning plans and progression frameworks' },
        { name: 'Personalized coding challenges' },
        { name: 'Unlimited AI assistant tokens' },
        { name: 'Access to upcoming beta features' },
        { name: 'Priority support' },
        { name: '50% student discount available' },
      ],
      compactFeatures: [
        { name: '10 Bespoke learning plans and progression frameworks' },
        { name: 'In depth stat analysis and progress tracking' },
        { name: 'Personalized coding challenges' },
        { name: 'Unlimited AI assistant tokens' },
        { name: 'Priority support' },
        { name: '50% student discount available' },
      ],
      cta: {
        text: user?.userLevel === 'PREMIUM' ? 'Current plan' : 'Get started',
        href: {
          local:
            billingPeriod === 'month'
              ? `https://buy.stripe.com/eVabKc0oc0aI23e28e?client_reference_id=${user?.uid}`
              : `https://buy.stripe.com/3cs4hKgna7DagY814d?client_reference_id=${user?.uid}`,
          production:
            billingPeriod === 'month'
              ? `https://buy.stripe.com/eVabKc0oc0aI23e28e?client_reference_id=${user?.uid}`
              : `https://buy.stripe.com/3cs4hKgna7DagY814d?client_reference_id=${user?.uid}`,
        },
      },
      mostPopular: false,
      disabled: user?.userLevel === 'PREMIUM',
    },
    {
      id: 'lifetime',
      name: 'Lifetime',
      price: 59.99,
      currencySymbol: '$',
      frequency: 'once',
      frequencyText: 'pay once, yours forever',
      features: [
        {
          name: 'Enhanced question suggestions',
        },
        { name: 'In depth stat analysis and progress tracking' },
        { name: '10 Bespoke learning plans and progression frameworks' },
        { name: 'Personalized coding challenges' },
        { name: 'Unlimited AI assistant tokens' },
        { name: 'Access to upcoming beta features' },
        { name: 'Priority support' },
        { name: '50% student discount available' },
        { name: 'Lifetime access to all features' },
      ],
      compactFeatures: [
        { name: '10 Bespoke learning plans and progression frameworks' },
        { name: 'In depth stat analysis and progress tracking' },
        { name: 'Personalized coding challenges' },
        { name: 'Unlimited AI assistant tokens' },
        { name: 'Priority support' },
        { name: '50% student discount available' },
        { name: 'Lifetime access to all features and future updates!' },
      ],
      paymentLink: {
        local: `https://buy.stripe.com/00g29C1sg3mU37i9AI?client_reference_id=${user?.uid}`,
        production: `https://buy.stripe.com/00g29C1sg3mU37i9AI?client_reference_id=${user?.uid}`,
      },
      cta: {
        text: user?.userLevel === 'PREMIUM' ? 'Current plan' : 'Get started',
        href: {
          local: `https://buy.stripe.com/00g29C1sg3mU37i9AI?client_reference_id=${user?.uid}`,
          production: `https://buy.stripe.com/00g29C1sg3mU37i9AI?client_reference_id=${user?.uid}`,
        },
      },
      mostPopular: true,
    },
  ];

  return plans;
};

export type Plan = ReturnType<typeof getPlans>[number];
