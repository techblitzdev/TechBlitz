import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { Separator } from '../ui/separator';
import { useUser } from '@/hooks/useUser';
import { Grid } from '../ui/grid';

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

export default function ProgressBentoBox() {
  return (
    <div className="h-full flex flex-col p-4 relative group overflow-hidden">
      <Grid size={20} position="top-right" />
      <div className="h-full flex items-center justify-center relative">
        <InfiniteMovingCards items={items} speed="slow" />
        <Separator className="absolute top-1/2 -translate-y-1/2 z-50 bg-black-50" />
      </div>
      <div className="flex w-full justify-between">
        <div className="space-y-1">
          <h6 className="text-xl">Progression</h6>
          <p className="font-satoshi text-xs">
            Your very own, personalised progression framework
          </p>
        </div>
        <Button variant="accent" className="font-ubuntu font-medium">
          View yours now{' '}
          <ArrowRight className="size-3 ml-1 group-hover:ml-2 duration-300" />
        </Button>
      </div>
    </div>
  );
}
