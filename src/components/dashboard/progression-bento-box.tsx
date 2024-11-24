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
  TooltipTrigger,
} from '../ui/tooltip';
import Chip from '../global/chip';
import Link from 'next/link';

const items: {
  name: string;
  title: string;
}[] = [
  {
    name: 'JavaScript',
    title: 'Object',
  },
  {
    name: 'JavaScript',
    title: 'Arrays',
  },
  {
    name: 'JavaScript',
    title: 'Functions',
  },
  {
    name: 'JavaScript',
    title: 'Scope',
  },
  {
    name: 'JavaScript',
    title: 'Asynchronous programming',
  },
  {
    name: 'JavaScript',
    title: 'Promises',
  },
  {
    name: 'JavaScript',
    title: 'Callbacks',
  },
  {
    name: 'JavaScript',
    title: 'Closures',
  },
];

export default async function ProgressBentoBox() {
  const user = await useUserServer();

  return (
    <Link
      href="/roadmaps"
      className="h-full flex flex-col p-4 relative group overflow-hidden"
    >
      {user?.userLevel !== 'FREE' && user?.userLevel !== 'STANDARD' && (
        <div className="absolute">
          <Chip color="accent" text="Roadmap" />
        </div>
      )}
      <Grid size={20} position="top-right" />
      <div className="h-full flex items-center justify-center relative">
        <InfiniteMovingCards items={items} speed="slow" />
        <Separator className="absolute top-1/2 -translate-y-1/2 z-50 bg-black-50" />
      </div>
      <div className="flex w-full justify-between">
        <div className="space-y-1">
          <h6 className="text-xl">Progression</h6>
          <p className="font-satoshi text-xs">
            Your very own, personalised progression framework to help you grow
            as a developer.
          </p>
        </div>
        {user?.userLevel !== 'FREE' && user?.userLevel !== 'STANDARD' && (
          <Button
            href="/roadmaps"
            variant="accent"
            className="font-ubuntu font-medium"
          >
            View yours now{' '}
            <ArrowRight className="size-3 ml-1 group-hover:ml-2 duration-300" />
          </Button>
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
