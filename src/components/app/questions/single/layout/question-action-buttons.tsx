'use client';

import { Button } from '@/components/ui/button';
import { useQuestionSingle } from '@/components/app/questions/single/layout/question-single-context';
import { CheckIcon, RefreshCcwIcon } from 'lucide-react';
import { AnimatedStopwatchButton } from '@/components/app/shared/question/question-timer';
import { useState, useEffect } from 'react';

export default function QuestionActionButtons() {
  const { resetQuestionState, submitAnswer, isSubmitting, selectedAnswer, user, question, code } =
    useQuestionSingle();
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [stopwatchOffset, setStopwatchOffset] = useState(new Date());

  useEffect(() => {
    // Reset the stopwatch offset when the component mounts
    setStopwatchOffset(new Date());
  }, []);

  const handleTimerToggle = () => {
    setIsTimerRunning((prev) => !prev);
  };

  const handleReset = () => {
    resetQuestionState();
    setStopwatchOffset(new Date());
    setIsTimerRunning(false);
  };

  return (
    <div className="flex gap-x-1 md:gap-x-2 items-center">
      <Button variant="destructive" onClick={handleReset}>
        <span className="hidden md:block">Reset</span>
        <span className="block md:hidden">
          <RefreshCcwIcon className="size-4" />
        </span>
      </Button>
      {user ? (
        <form onSubmit={(e) => submitAnswer(e)}>
          <Button
            type="submit"
            disabled={isSubmitting || (!selectedAnswer && !code)}
            className="text-green-500"
          >
            <span className="hidden md:block">Submit</span>
            <span className="block md:hidden">
              <CheckIcon className="size-4" />
            </span>
          </Button>
        </form>
      ) : (
        <Button variant="accent" href={`/login?redirectUrl=question/${question.uid}`}>
          Login to Submit
        </Button>
      )}
      <AnimatedStopwatchButton onToggle={handleTimerToggle} stopwatchOffset={stopwatchOffset} />
    </div>
  );
}
