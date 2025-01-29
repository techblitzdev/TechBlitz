import { getRandomQuestion } from '@/utils/data/questions/get-random';
import { Button } from '@/components/ui/button';
import { ShuffleIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

/**
 * Component for redirecting the user to a random question.
 *
 * @returns
 */
export default async function RandomQuestion(opts: {
  identifier: 'slug' | 'uid';
  currentQuestionSlug: string;
}) {
  const { identifier, currentQuestionSlug } = opts;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <form
            action={async () => {
              'use server';
              const randomQuestion = await getRandomQuestion({
                identifier,
                currentQuestionSlug,
              });

              redirect(`/question/${randomQuestion}`);
            }}
          >
            <Button variant="default" size="icon">
              <ShuffleIcon size={16} />
            </Button>
          </form>
        </TooltipTrigger>
        <TooltipContent>
          <p>Go to a Random question</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
