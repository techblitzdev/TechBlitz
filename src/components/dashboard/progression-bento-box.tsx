import { ArrowRight, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { Separator } from '../ui/separator';
import { Grid } from '../ui/grid';
import { useUserServer } from '@/hooks/useUserServer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip';
import Chip from '../ui/chip';
import Link from 'next/link';

const items: {
  name: string;
  title: string;
}[] = [
  {
    name: 'JavaScript',
    title: 'Objects'
  },
  {
    name: 'JavaScript',
    title: 'Arrays'
  },
  {
    name: 'JavaScript',
    title: 'Data types'
  },
  {
    name: 'JavaScript',
    title: 'Array methods'
  },
  {
    name: 'JavaScript',
    title: 'Asynchronous programming'
  },
  {
    name: 'JavaScript',
    title: 'Promises'
  },
  {
    name: 'JavaScript',
    title: 'Callbacks'
  },
  {
    name: 'JavaScript',
    title: 'Closures'
  }
];

export default async function ProgressBentoBox() {
  const user = await useUserServer();

  return (
    <Link
      href="/roadmaps"
      className="h-full flex flex-col p-4 relative group overflow-hidden"
    >
      {user?.userLevel !== 'FREE' && user?.userLevel !== 'STANDARD' && (
        <div className="absolute z-10">
          <Chip
            color="accent"
            text="Roadmap"
          />
        </div>
      )}
      <Grid
        size={20}
        position="top-right"
      />
      <div className="h-full flex items-center justify-center relative">
        <InfiniteMovingCards
          items={items}
          speed="slow"
        />
        <Separator className="absolute top-1/2 -translate-y-1/2 z-50 bg-black-50" />
      </div>
      <div className="flex flex-col md:flex-row gap-y-2 w-full justify-between">
        <div className="space-y-1">
          <h6 className="text-xl">Progression</h6>
          <p className="hidden md:block font-satoshi text-xs">
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
