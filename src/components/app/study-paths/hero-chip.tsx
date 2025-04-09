import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronLeft } from 'lucide-react';

export default function HeroChip() {
  return (
    <div className="text-xs text-white py-1 rounded-full w-fit z-20">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              href="/roadmaps"
              variant="ghost"
              size="sm"
              className="p-1 h-fit flex items-center gap-1"
            >
              <ChevronLeft className="size-4 text-white" />
              <div className="flex items-center gap-x-1">Back to library</div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
