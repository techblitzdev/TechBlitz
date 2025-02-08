'use client';

import { Button } from '@/components/ui/button';
import { useQuestionSingle } from '@/contexts/question-single-context';
import { RefreshCcwIcon } from 'lucide-react';
import { AnimatedStopwatchButton } from '@/components/app/shared/question/question-timer';
import { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import LoadingSpinner from '@/components/ui/loading';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuestionActionButtons() {
  const {
    resetQuestionState,
    submitAnswer,
    isSubmitting,
    selectedAnswer,
    user,
    question,
    code,
    currentLayout,
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
        <div className="relative">
          <AnimatePresence>
            <motion.span
              key="reset-text"
              className="hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Reset
            </motion.span>
          </AnimatePresence>
          <AnimatePresence>
            <motion.span
              key="reset-icon"
              className="block md:hidden"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <RefreshCcwIcon className="w-4 h-4" />
            </motion.span>
          </AnimatePresence>
        </div>
      </Button>
      {user ? (
        <form onSubmit={handleSubmit}>
          <Button
            type="submit"
            disabled={isSubmitting || (!selectedAnswer && !code) || currentLayout === 'answer'}
            className="text-green-500"
          >
            <AnimatePresence>
              {isSubmitting ? (
                <motion.div
                  key="loading"
                  className="flex items-center gap-x-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <LoadingSpinner />
                  <span>Submitting...</span>
                </motion.div>
              ) : (
                <motion.span
                  key="submit"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  Submit
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </form>
      ) : (
        <Button variant="accent" href={`/login?redirectUrl=question/${question.uid}`}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Login to Submit
          </motion.span>
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
