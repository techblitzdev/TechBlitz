import { Tour } from 'onborda/dist/types';

export const steps: Tour[] = [
  {
    tour: 'question-tour',
    steps: [
      {
        content: <>Welcome to Onborda, an onboarding flow for Next.js!</>,
        selector: '#code-snippet',
        side: 'left',
        showControls: true,
        pointerPadding: -1,
        pointerRadius: 24,
        icon: <></>,
        title: 'Welcome to TechBlitz',
        nextRoute: '/page-two',
        prevRoute: '/',
      },
    ],
  },
];
