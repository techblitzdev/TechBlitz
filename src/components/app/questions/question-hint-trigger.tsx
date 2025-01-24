import { Button } from '@/components/ui/button';
import { TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@/components/ui/tooltip';
import { Lightbulb } from 'lucide-react';
import { useQuestionSingle } from './single/layout/question-single-context';

export default function QuestionHintTrigger() {
  const { showHint, setShowHint } = useQuestionSingle();

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleHint}
            variant="ghost"
            size="icon"
            padding="none"
          >
            <Lightbulb className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View the hint for this question</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
