import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronLeft, Sparkles } from 'lucide-react';
import type { StudyPath } from '@prisma/client';

export default function HeroChip({ studyPath }: { studyPath: StudyPath }) {
  return (
    <div className="text-xs text-white py-1 rounded-full w-fit flex items-center gap-x-3 z-20">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button href="/roadmaps" variant="ghost" size="sm" className="p-1 h-fit">
              <ChevronLeft className="size-4 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back to roadmaps</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex items-center gap-x-1">
        <Sparkles className="size-3 text-yellow-400 fill-yellow-500" />
        {studyPath?.heroChip}
      </div>
    </div>
  );
}
