import { BentoGrid, BentoCard } from '@/components/ui/magicui/bento-grid';
import { CalendarIcon, InputIcon } from '@radix-ui/react-icons';
import { FileTextIcon, GlobeIcon } from 'lucide-react';

const features = [
  {
    Icon: FileTextIcon,
    name: 'Micro challenges',
    description: 'Challenges that improve your knowledge and save you time.',
    href: '/daily-challenge',
    cta: 'Answer the daily challenge',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'col-span-3 lg:col-span-1',
  },
  {
    Icon: InputIcon,
    name: 'Any device',
    description:
      'All daily challenges are available to be completed on any device. The ultimate convenience.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'col-span-3 lg:col-span-2',
  },
  {
    Icon: GlobeIcon,
    name: 'Social',
    description:
      'Battle with your friends, family or coworker, and see who is the best!',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'col-span-3 lg:col-span-2',
  },
  {
    Icon: CalendarIcon,
    name: 'Streaks',
    description:
      'Keep track of your daily challenges and see how long you can go without missing a day.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'col-span-3 lg:col-span-1',
  },
];

/**
 * NOTES:
 *
 * - Idea: bento grid that will showcase:
 * - the type of challenges (maybe not a code snippet)
 * - The streak aspect (show a nice calendar)
 * - Show the social aspect (show a nice grid of users)
 * - The notifications aspect (show a nice notification icon)
 * - The micro challenges aspect (show a nice code snippet)
 * - The convenience aspect (show a nice icon of a phone)
 */
export default function FeatureDailyChallengeBentoGrid() {
  return (
    <section className="py-16 pb-36 flex flex-col items-center gap-5">
      <h2 className="text-center text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
        Become the best developer you can be.
      </h2>
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}
