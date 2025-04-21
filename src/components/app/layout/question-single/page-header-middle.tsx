'use client';

import { Suspense, useState } from 'react';
import type { Question } from '@/types/Questions';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import SinglePageProgress from '@/components/app/study-paths/single-page-progress';
import QuestionActionButtons from './question-action-buttons';
import { Button } from '@/components/ui/button';
import { BarChart2, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionPageHeaderMiddleProps {
  question: Question;
  studyPathMetadata?: {
    totalLessons: number;
  };
}

export default function QuestionPageHeaderMiddle({
  question,
  studyPathMetadata,
}: QuestionPageHeaderMiddleProps) {
  const [showProgress, setShowProgress] = useState(false);

  if (!question.slug) {
    return null;
  }

  return (
    <div className="flex items-center justify-center w-full relative">
      {/* Container with fixed height to prevent layout shift */}
      <div className="w-full h-10 relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {(showProgress &&
            studyPathMetadata &&
            question.questionType === 'SIMPLE_MULTIPLE_CHOICE') ||
          question.questionType === 'SIMPLE_MULTIPLE_CHOICE' ? (
            <motion.div
              key="progress"
              className="absolute inset-0 w-full flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            >
              {studyPathMetadata && (
                <SinglePageProgress totalLessons={studyPathMetadata.totalLessons} />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="actions"
              className="absolute inset-0 w-full flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            >
              <Suspense
                fallback={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full flex justify-center"
                  >
                    Loading...
                  </motion.div>
                }
              >
                <QuestionActionButtons />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button - only show if we have study path metadata */}
      {question.questionType !== 'SIMPLE_MULTIPLE_CHOICE' && studyPathMetadata && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 relative"
                onClick={() => setShowProgress(!showProgress)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {showProgress ? (
                    <motion.div
                      key="code-icon"
                      initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Code className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="chart-icon"
                      initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <BarChart2 className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {showProgress ? 'Show code actions' : 'Show Roadmap progress'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
