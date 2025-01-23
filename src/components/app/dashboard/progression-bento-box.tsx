import { ArrowRight, Lock } from 'lucide-react';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { Separator } from '@/components/ui/separator';
import { Grid } from '@/components/ui/grid';
import { useUserServer } from '@/hooks/use-user-server';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Chip from '@/components/ui/chip';
import Link from 'next/link';

const items: {
  name: string;
  title: string;
}[] = [
  {
    name: 'ES6+',
    title: 'Modern ES6+ Features',
  },
  {
    name: 'DOM',
    title: 'Advanced DOM Manipulation',
  },
  {
    name: 'Patterns',
    title: 'Design Patterns',
  },
  {
    name: 'Performance',
    title: 'Performance Optimization',
  },
  {
    name: 'State',
    title: 'State Management',
  },
  {
    name: 'Testing',
    title: 'Testing & Debugging',
  },
  {
    name: 'APIs',
    title: 'Web APIs & Integration',
  },
  {
    name: 'Security',
    title: 'Security Best Practices',
  },
  {
    name: 'Functional',
    title: 'Functional Programming',
  },
  {
    name: 'DSA',
    title: 'Data Structures & Algorithms',
  },
];

export default async function ProgressBentoBox() {
  const user = await useUserServer();

  return (
    <Link
      href={`${user?.userLevel === 'FREE' ? 'https://dub.sh/upgrade-techblitz' : '/roadmaps'}`}
      className="h-full flex flex-col p-4 relative group overflow-hidden"
    >
      {user?.userLevel !== 'FREE' && user?.userLevel !== 'STANDARD' && (
        <div className="absolute z-30">
          <Chip
            textColor="text-black"
            color="bg-secondary"
            text="Roadmap"
            border="border-secondary"
          />
        </div>
      )}
      {user?.userLevel === 'FREE' && (
        <div className="absolute z-10">
          <Chip
            textColor="text-black"
            color="bg-secondary"
            text="Upgrade to access Roadmaps"
            border="border-secondary"
          />
        </div>
      )}
      <Grid size={20} position="top-right" />
      <div className="h-full flex items-center justify-center relative">
        <InfiniteMovingCards items={items} speed="slow" />
        <Separator className="absolute top-1/2 -translate-y-1/2 z-50 bg-black-50" />
      </div>
      <div className="flex flex-col md:flex-row gap-y-2 w-full justify-between">
        <div className="space-y-1">
          <h6 className="text-xl">Progression</h6>
          <p className="hidden md:block font-satoshi text-sm">
            Your very own, personalised progression framework to help you grow
            as a developer.
          </p>
        </div>
        {user?.userLevel !== 'FREE' && user?.userLevel !== 'STANDARD' && (
          <div className="items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-accent text-white shadow-sm hover:bg-accent/90 h-9 px-4 py-2 inline-flex font-ubuntu font-medium">
            View yours now{' '}
            <ArrowRight className="size-3 ml-1 group-hover:ml-2 duration-300" />
          </div>
        )}
      </div>
      {user?.userLevel === 'FREE' ||
        (user?.userLevel === 'STANDARD' && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="absolute">
                <div className="flex items-center bg-accent p-2 rounded-md">
                  <Lock className="size-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="font-satoshi">
                You need to be a premium member to access this feature.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
    </Link>
  );
}
