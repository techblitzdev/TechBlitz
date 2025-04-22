'use client';

import { Suspense } from 'react';
import type { Question } from '@/types/Questions';
import SinglePageProgress from '@/components/app/study-paths/single-page-progress';
import QuestionActionButtons from './question-action-buttons';
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
  if (!question.slug) {
    return null;
  }

  // For SIMPLE_MULTIPLE_CHOICE questions, show progress or toggle
  return (
    <div className="flex items-center justify-center w-full relative">
      {/* Container with fixed height to prevent layout shift */}
      <div className="w-full h-10 relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {studyPathMetadata && question.questionType === 'SIMPLE_MULTIPLE_CHOICE' ? (
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
              <SinglePageProgress totalLessons={studyPathMetadata.totalLessons} />
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
    </div>
  );
}
