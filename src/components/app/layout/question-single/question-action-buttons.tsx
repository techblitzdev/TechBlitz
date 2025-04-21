'use client';

import { Button } from '@/components/ui/button';
import { useQuestionSingle } from '@/contexts/question-single-context';
import { CheckCircleIcon, Play, XCircleIcon, RefreshCcwIcon } from 'lucide-react';
import { AnimatedStopwatchButton } from '@/components/app/shared/question/question-timer';
import { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import LoadingSpinner from '@/components/ui/loading';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';

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
    runningCode,
    testRunCode,
    testRunResult,
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
    <div id="question-action-buttons" className="flex gap-x-1 md:gap-x-2 items-center">
      <div className="flex rounded-md overflow-hidden">
        <Button
          variant="destructive"
          onClick={handleReset}
          className="rounded-r-none border-r border-black-50"
          size="sm"
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.span
                key="reset-text"
                className="hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Reset
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                key="reset-icon"
                className="block md:hidden"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, rotate: 360 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <RefreshCcwIcon className="w-4 h-4" />
              </motion.span>
            </AnimatePresence>
          </div>
        </Button>
        {question.questionType !== 'SIMPLE_MULTIPLE_CHOICE' && (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  className="rounded-none"
                  size="sm"
                  onClick={testRunCode}
                  disabled={runningCode}
                >
                  <AnimatePresence mode="wait">
                    {!runningCode ? (
                      <motion.span
                        key="run-icon"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        {testRunResult ? (
                          <AnimatePresence mode="wait">
                            {testRunResult?.passed ? (
                              <motion.div
                                key="success"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                              >
                                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="error"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                              >
                                <XCircleIcon className="w-4 h-4 text-red-500" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        ) : (
                          <AnimatePresence mode="wait">
                            <motion.span
                              key="run-icon"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2, ease: 'easeOut' }}
                            >
                              <Play className="w-4 h-4 fill-gray-400 text-gray-400" />
                            </motion.span>
                          </AnimatePresence>
                        )}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="loading-icon"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        <LoadingSpinner className="w-4 h-4 fill-gray-400 text-gray-400" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{runningCode ? 'Running code...' : 'Run Code'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {user ? (
          <form onSubmit={handleSubmit}>
            <Button
              type="submit"
              disabled={isSubmitting || (!selectedAnswer && !code) || currentLayout === 'answer'}
              className="text-green-500 rounded-l-none"
              size="sm"
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    className="flex items-center gap-x-2"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <LoadingSpinner />
                    <span>Submitting...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="submit"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    Submit
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </form>
        ) : (
          <Button
            variant="accent"
            href={`/login?redirectUrl=question/${question.uid}`}
            className="rounded-l-none"
            size="sm"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              Login to Submit
            </motion.span>
          </Button>
        )}
      </div>
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
