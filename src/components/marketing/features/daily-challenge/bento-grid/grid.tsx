import { BentoGrid, BentoCard } from '@/components/ui/magicui/bento-grid';
import { BellIcon, CalendarIcon, InputIcon } from '@radix-ui/react-icons';
import { FileTextIcon, GlobeIcon } from 'lucide-react';

const features = [
  {
    Icon: FileTextIcon,
    name: 'Micro challenges',
    description: 'Challenges that improve your knowledge and save you time.',
    href: '/daily-challenge',
    cta: 'Answer the daily challenge',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
  },
  {
    Icon: InputIcon,
    name: 'Any device',
    description:
      'All daily challenges are available to be completed on any device. The ultimate convenience.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
  },
  {
    Icon: GlobeIcon,
    name: 'Social',
    description:
      'Battle with your friends, family or coworker, and see who is the best!',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
  },
  {
    Icon: CalendarIcon,
    name: 'Streaks',
    description:
      'Keep track of your daily challenges and see how long you can go without missing a day.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
  },
  {
    Icon: BellIcon,
    name: 'Notifications',
    description:
      'Want to be notified when the daily challenge is available? We got you!',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
  },
];

/**
 * NOTES:
 *
 * - Idea: bento grid that will showcase:
 * - the type of challenges (maybe not a code snippet)
 * - The streak aspect (show a nice calendar)
 * - Show the social aspect (show a nice grid of users)
 */
export default function FeatureDailyChallengeBentoGrid() {
  return (
    <section className="py-16 pb-36">
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}
