import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Answer } from '@/types/Answers';
import { XIcon } from 'lucide-react';
import { CheckIcon } from 'lucide-react';

export default function HasAnswered(opts: { userAnswered: Answer | null }) {
  const { userAnswered } = opts;

  return (
    <p>
      {userAnswered !== null ? (
        userAnswered.correctAnswer ? (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <div className="flex items-center gap-1 text-sm font-onest font-light">
                  Correct
                  <CheckIcon className="size-4 text-green-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  You answered this question correctly on the{' '}
                  {userAnswered.createdAt.toLocaleDateString()}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <div className="flex items-center gap-2 text-sm">
                  Incorrect
                  <XIcon className="size-4 text-red-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  You have attempted this question, but it was incorrect on{' '}
                  {userAnswered.createdAt.toLocaleDateString()}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      ) : (
        ''
      )}
    </p>
  );
}
