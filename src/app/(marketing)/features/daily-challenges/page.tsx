import FeatureDailyChallengeBentoGrid from '@/components/marketing/features/daily-challenge/bento-grid/grid';
import FeatureDailyChallengeHero from '@/components/marketing/features/daily-challenge/hero/daily-challenge-hero';
import CallToActionBlock from '@/components/marketing/global/call-to-action-block';
import MarketingContentGrid, {
  type MarketingContentGridProps,
} from '@/components/marketing/global/content-grid';
import FAQsBlock, { FAQ } from '@/components/marketing/global/faqs';
import { MobileIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const items: MarketingContentGridProps[] = [
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
    title: 'Short-form challenges',
    description:
      'Dive into coding challenges that are quick yet impactful. Designed to sharpen your skills in minutes, these challenges offer real-world problem-solving without the lengthy commitment.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 .807L23.835 8.5L22 9.693V16h-2v-5.007l-1 .65V17.5c0 1.47-1.014 2.615-2.253 3.339c-1.265.737-2.945 1.16-4.747 1.16s-3.483-.423-4.747-1.16C6.013 20.115 5 18.969 5 17.499v-5.856L.165 8.5zM7 12.943V17.5c0 .463.33 1.067 1.261 1.61c.908.53 2.227.89 3.739.89s2.831-.36 3.739-.89c.932-.543 1.26-1.147 1.26-1.61v-4.557l-5 3.25zM20.165 8.5L12 3.193L3.835 8.5L12 13.807z"
        />
      </svg>
    ),
    title: 'Microlearning',
    description:
      'Master software concepts daily with bite-sized problems that fit into your schedule. Stay consistent and learn without spending hours on a single tasks.',
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
    title: 'Collaborative learning',
    description:
      'Join a community of like-minded learners! Opt to solve challenges alongside others, exchange ideas, and grow through shared knowledge.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 15q.425 0 .713-.288T13 14t-.288-.712T12 13t-.712.288T11 14t.288.713T12 15m-1-4h2V5h-2zM2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z"
        />
      </svg>
    ),
    title: 'Instant feedback',
    description:
      'Receive immediate feedback on your solutions. Understand where you went wrong and how to improve.',
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
          strokeWidth="2"
        >
          <path strokeMiterlimit="5.759" d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path strokeMiterlimit="5.759" d="m7 14l4-4l4 4l6-6" />
          <path d="M18 8h3v3" />
        </g>
      </svg>
    ),
    title: 'Track your progress',
    description:
      'Monitor your growth with detailed statistics. Keep tabs on your performance and see how you stack up against others.',
  },
  {
    icon: <MobileIcon className="size-6" />,
    title: 'Mobile-friendly',
    description:
      'Access challenges on the go. Solve problems from your phone, tablet, or computer.',
  },
];

const faqs: FAQ[] = [
  {
    question: 'What is the daily challenge?',
    answer:
      'The daily challenge is a coding challenge that is available every day.',
  },
  {
    question: 'Can I skip a day?',
    answer: 'Yes, you can skip a day. But you will lose your streak.',
  },
  {
    question: "What if I don't have time to complete the challenge?",
    answer: 'No problem! You can always come back tomorrow.',
  },
  {
    question: 'How many times can I answer the daily challenge?',
    answer: 'You can answer the daily challenge as many times as you want.',
  },
  {
    question: 'Can I track my progress?',
    answer:
      'Yes, you can track your progress by looking at the leaderboard, or checking our your statistics with out statistics page.',
  },
  {
    question: 'Do I need to pay to use the daily challenge?',
    answer: (
      <>
        No, the daily challenge is free to use for everyone. You can{' '}
        <Link href="/signup" className="text-accent">
          sign up
        </Link>{' '}
        for free and start solving challenges today
      </>
    ),
  },
];

export default function FeatureDailyQuestionPage() {
  return (
    <div className="container">
      <FeatureDailyChallengeHero />
      <FeatureDailyChallengeBentoGrid />
      <MarketingContentGrid title="Coding made easy." items={items} />
      <FAQsBlock faqs={faqs} />
      <CallToActionBlock
        title="The fastest way to master coding."
        description="Daily challenges designed to make you a better developer, faster."
      />
    </div>
  );
}
