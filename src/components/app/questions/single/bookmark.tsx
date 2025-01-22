import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Bookmark } from 'lucide-react';

export default function BookmarkQuestion() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button className="flex items-center gap-1 text-sm font-onest font-light">
            <Bookmark className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Bookmark this question</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
