'use client';

import { useState } from 'react';
import { useTransition } from 'react';
import { bookmarkQuestion } from '@/actions/questions/bookmark';
import { Button } from '@/components/ui/button';
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
  TooltipProvider,
} from '@/components/ui/tooltip';
import type { Question } from '@/types/Questions';
import { Bookmark } from 'lucide-react';
import { toast } from 'sonner';

export default function BookmarkQuestion({ question }: { question: Question }) {
  const [isBookmarked, setIsBookmarked] = useState(
    question.bookmarks && question.bookmarks.length > 0
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setBookmarkCount] = useState(
    question.bookmarks && question.bookmarks.length
  );
  const [isPending, startTransition] = useTransition();

  const handleBookmark = () => {
    startTransition(async () => {
      try {
        await bookmarkQuestion(question.uid);
        setIsBookmarked((prev) => !prev);
        setBookmarkCount((prevCount = 0) =>
          isBookmarked ? prevCount - 1 : prevCount + 1
        );
      } catch (error) {
        toast.error('Failed to bookmark question. Please try again.');
      }
    });
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            padding="none"
            className="px-0"
            onClick={handleBookmark}
            disabled={isPending}
          >
            <Bookmark
              className={`size-5 ${
                isBookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-white'
              } transition-colors duration-200`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isBookmarked ? 'Remove bookmark' : 'Bookmark this question'}: </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
