import { Button } from '@/components/ui/button';
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Bookmark } from 'lucide-react';

export default function BookmarkQuestion() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" padding="none" className="px-0">
            <Bookmark className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Bookmark this question</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
