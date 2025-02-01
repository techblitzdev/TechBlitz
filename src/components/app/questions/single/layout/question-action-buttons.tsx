'use client';

import { Button } from '@/components/ui/button';
import { useQuestionSingle } from '@/components/app/questions/single/layout/question-single-context';
import { RefreshCcwIcon } from 'lucide-react';
import { AnimatedStopwatchButton } from '@/components/app/shared/question/question-timer';
import { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

export default function QuestionActionButtons() {
  const {
    resetQuestionState,
    submitAnswer,
    isSubmitting,
    selectedAnswer,
    user,
    question,
    code,
    setTotalSeconds,
  } = useQuestionSingle();

  const [stopwatchOffset, setStopwatchOffset] = useState<Date>(new Date());

  const { seconds, minutes, isRunning, start, pause, totalSeconds, reset } = useStopwatch({
    offsetTimestamp: stopwatchOffset,
  });

  useEffect(() => {
    // Reset the stopwatch offset when the component mounts
    setStopwatchOffset(new Date());
  }, []);

  const handleReset = () => {
    resetQuestionState();
    reset();
    setStopwatchOffset(new Date());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRunning) {
      pause();
    }

    setTotalSeconds(totalSeconds);
    submitAnswer(e, totalSeconds);
  };

  return (
    <div className="flex gap-x-1 md:gap-x-3 items-center">
      <Button variant="destructive" onClick={handleReset}>
        <span className="hidden md:block">Reset</span>
        <span className="block md:hidden">
          <RefreshCcwIcon className="w-4 h-4" />
        </span>
      </Button>
      {user ? (
        <form onSubmit={handleSubmit}>
          <Button
            type="submit"
            disabled={isSubmitting || (!selectedAnswer && !code)}
            className="text-green-500"
          >
            Submit
          </Button>
        </form>
      ) : (
        <Button variant="accent" href={`/login?redirectUrl=question/${question.uid}`}>
          Login to Submit
        </Button>
      )}
      <AnimatedStopwatchButton
        isRunning={isRunning}
        start={start}
        pause={pause}
        seconds={seconds}
        minutes={minutes}
      />
    </div>
  );
}
