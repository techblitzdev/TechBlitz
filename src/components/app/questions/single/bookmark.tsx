import { bookmarkQuestion } from '@/actions/questions/bookmark';
import { Button } from '@/components/ui/button';
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Question } from '@/types/Questions';
import { Bookmark } from 'lucide-react';

export default function BookmarkQuestion({ question }: { question: Question }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            padding="none"
            className="px-0"
            onClick={() => bookmarkQuestion(question.uid)}
          >
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
