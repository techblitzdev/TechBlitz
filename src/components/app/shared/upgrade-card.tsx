import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function UpgradeCard() {
  return (
    <div className="flex flex-col gap-y-2 backdrop-blur-sm border border-black-50 p-4 rounded-lg">
      <div className="flex items-center space-x-2 text-white">
        <Sparkles className="size-5 text-yellow-400 fill-yellow-500" />
        <span>Looking for a personalized study plan?</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Unlock your full potential with a personalized study plan tailored just
        for you. Get focused learning paths, progress tracking, and expert
        guidance to learn 3x faster.
        <br />
        <br />
        Limited time offer: Use code{' '}
        <span className="font-semibold">250USERS</span> for 60% off! Valid until
        31st January.
      </p>
      <Button
        href="https://dub.sh/upgrade-techblitz"
        className="mt-2 w-full"
        variant="accent"
      >
        Upgrade to Premium
      </Button>
    </div>
  );
}
