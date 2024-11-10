import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';

export default function ProgressBentoBox() {
  const items: {
    quote: string;
    name: string;
    title: string;
  }[] = [
    {
      name: 'John Doe',
      quote: 'I have a dream',
      title: 'Software Engineer',
    },
    {
      name: 'Jane Doe',
      quote: 'I have a dream',
      title: 'Software Engineer',
    },
  ];

  return (
    <div className="h-full flex flex-col p-4 relative">
      <div className="h-full flex items-center justify-center">
        <InfiniteMovingCards items={items} speed="normal" />
      </div>
      <div className="flex w-full justify-between">
        <div className="space-y-1">
          <h6 className="text-xl">Progression</h6>
          <p className="font-satoshi text-xs">
            Your very own, personalised progression framework
          </p>
        </div>
        <Button variant="accent" className="font-ubuntu font-medium">
          View yours now <ArrowRight className="size-3" />
        </Button>
      </div>
    </div>
  );
}
