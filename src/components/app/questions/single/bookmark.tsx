'use client';

import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { TooltipContent, TooltipTrigger, Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { Bookmark } from 'lucide-react';

import { bookmarkQuestion } from '@/actions/questions/bookmark';
import type { Question } from '@/types/Questions';
import { RoadmapUserQuestions } from '@/types/Roadmap';

export default function BookmarkQuestion({
  question,
  isRoadmap = false,
}: {
  question: Question | RoadmapUserQuestions;
  isRoadmap?: boolean;
}) {
  const [isBookmarked, setIsBookmarked] = useState(
    question.bookmarks && question.bookmarks.length > 0
  );
  const [isPending, startTransition] = useTransition();

  const handleBookmark = () => {
    startTransition(async () => {
      try {
        await bookmarkQuestion(question.uid, isRoadmap);
        setIsBookmarked((prev) => !prev);
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
            size="sm"
            padding="none"
            className="px-0"
            onClick={handleBookmark}
            disabled={isPending}
          >
            <Bookmark
              className={`size-4 ${
                isBookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-white'
              } transition-colors duration-200`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isBookmarked ? 'Remove bookmark' : 'Bookmark this question'} </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
