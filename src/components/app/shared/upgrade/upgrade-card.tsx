import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getUpgradeUrl } from '@/utils';

export default function UpgradeCard({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="bg-secondary dark:bg-[#090909] flex flex-col gap-y-2 backdrop-blur-sm border border-secondary dark:border-black-50 p-4 rounded-lg">
      <div className="flex items-center space-x-2 text-black dark:text-white">
        <Sparkles className="size-7 text-yellow-400 fill-yellow-500" />
        <span>{title || 'Looking for a more personalized experience?'}</span>
      </div>
      <p className="text-sm text-muted-foreground">
        {description ||
          'Unlock your full potential with a personalized study plan tailored just for you. Get focused learning paths, progress tracking, and expert guidance to learn 3x faster.'}
      </p>
      <Button href={getUpgradeUrl()} className="mt-2 w-full" variant="premium">
        Upgrade to Premium
      </Button>
    </div>
  );
}
