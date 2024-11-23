import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function QuestionNavigation(opts: {
  nextQuestion: string | null;
  previousQuestion: string | null;
}) {
  const { nextQuestion, previousQuestion } = opts;

  return (
    <div className="flex gap-x-2 items-center">
      {/* Previous Question */}
      <TooltipProvider delayDuration={0} skipDelayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={previousQuestion || '#'}
              className={`bg-black-100 border border-black-50 p-2 rounded-md relative group duration-200 size-8 flex items-center justify-center ${
                !previousQuestion ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              <ChevronLeft className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
              <ArrowLeft className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-white font-inter">
            {previousQuestion ? 'Previous question' : 'No previous question'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Next Question */}
      <TooltipProvider delayDuration={0} skipDelayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={nextQuestion || '#'}
              className={`bg-black-100 border border-black-50 p-2 rounded-md relative group duration-200 size-8 flex items-center justify-center ${
                !nextQuestion ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              <ChevronRight className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
              <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {nextQuestion ? 'Next question' : 'No next question'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
