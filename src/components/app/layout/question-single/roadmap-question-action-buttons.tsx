'use client';
import { Button } from '@/components/ui/button';
import { RefreshCcwIcon } from 'lucide-react';
import { useRoadmapQuestion } from '../../../../contexts/roadmap-question-context';

export default function RoadmapQuestionActionButtons() {
  const { handleAnswerRoadmapQuestion, resetQuestionState } = useRoadmapQuestion();

  return (
    <div className="flex gap-x-1 md:gap-x-3 items-center">
      <Button variant="destructive" onClick={resetQuestionState}>
        <span className="hidden md:block">Reset</span>
        <span className="block md:hidden">
          <RefreshCcwIcon className="w-4 h-4" />
        </span>
      </Button>
      <form onSubmit={(e) => handleAnswerRoadmapQuestion(e)}>
        <Button type="submit" className="text-green-500">
          Submit
        </Button>
      </form>
    </div>
  );
}
