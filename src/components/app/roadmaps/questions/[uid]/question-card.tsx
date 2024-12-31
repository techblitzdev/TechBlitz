'use client';

import Chip from '@/components/ui/chip';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import { cn } from '@/utils/cn';
import { Check, X } from 'lucide-react';
import Link from 'next/link';
import RoadmapQuestionCardMenu from './question-card-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function RoadmapQuestionCard(opts: {
  question: Partial<RoadmapUserQuestions>;
  roadmapUid: string;
  index: number;
  totalQuestions: number;
  nextQuestionCorrect?: boolean;
  nextQuestionAnswered?: boolean;
  prevQuestionCorrect?: boolean;
  prevQuestionAnswered?: boolean;
}) {
  const {
    question: initialQuestion,
    roadmapUid,
    index,
    totalQuestions,
    prevQuestionCorrect,
    prevQuestionAnswered,
  } = opts;

  const [isLoading, setIsLoading] = useState(false);
  const questionRef = useRef(initialQuestion);

  useEffect(() => {
    if (!isLoading) {
      questionRef.current = initialQuestion;
    }
  }, [initialQuestion, isLoading]);

  if (!questionRef.current || !questionRef.current.uid) return null;

  const handleRegenerateStart = () => {
    setIsLoading(true);
  };

  const handleRegenerateEnd = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative flex gap-7">
      <div
        className={cn(
          'relative flex-col items-center w-0.5 hidden md:flex',
          index === totalQuestions - 1 && 'pb-6'
        )}
      >
        {/* Top line */}
        <div
          className={cn(
            'bg-black-50 w-0.5 relative h-1/2',
            index === 0 && 'opacity-0', // First question has no top line
            questionRef.current?.completed &&
              questionRef.current?.userCorrect &&
              'bg-green-500',
            questionRef.current?.completed &&
              !questionRef.current?.userCorrect &&
              'bg-destructive',
            prevQuestionAnswered && !prevQuestionCorrect && 'bg-destructive',
            prevQuestionCorrect && 'bg-green-500'
          )}
        />

        {/* Dot */}
        <div
          className={cn(
            'size-3 rounded-full bg-black-50', // Default dot
            questionRef.current?.completed &&
              questionRef.current?.userCorrect &&
              'bg-green-500',
            questionRef.current?.completed &&
              !questionRef.current?.userCorrect &&
              'bg-destructive'
          )}
        />

        {/* Bottom line */}
        <div
          className={cn(
            'bg-black-50 w-0.5 relative h-1/2',
            index === totalQuestions - 1 && 'opacity-0', // Last question has no bottom line
            questionRef.current?.completed &&
              questionRef.current?.userCorrect &&
              'bg-green-500',
            questionRef.current?.completed &&
              !questionRef.current?.userCorrect &&
              'bg-destructive'
          )}
        />
      </div>
      <Link
        href={`/roadmap/${roadmapUid}/${questionRef.current.uid}`}
        key={questionRef.current.uid}
        className="py-6 mb-6 space-y-5 items-start border border-black-50 hover:border-accent duration-300 p-5 rounded-lg group w-full h-auto flex flex-col relative overflow-hidden"
      >
        <div className="flex w-full justify-between gap-3">
          <AnimatePresence mode="wait">
            <motion.h6
              key={isLoading ? 'loading' : 'content'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-base text-wrap text-start w-full max-w-[90%]"
            >
              {isLoading ? (
                <Skeleton className="bg-black-50 h-6 w-full" />
              ) : (
                questionRef.current.question
              )}
            </motion.h6>
          </AnimatePresence>
          <RoadmapQuestionCardMenu
            questionAnswered={questionRef.current.completed || false}
            questionUid={questionRef.current.uid}
            onRegenerateStart={handleRegenerateStart}
            onRegenerateEnd={handleRegenerateEnd}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLoading ? 'loading' : 'content'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {isLoading ? (
              <div className="space-y-5">
                <div className="mt-5 w-full flex justify-between items-end">
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ) : (
              <>
                <div className="mt-5 w-full flex justify-between items-end">
                  <div className="flex items-center gap-x-3">
                    {questionRef.current?.difficulty && (
                      <Chip
                        text={capitalise(questionRef.current.difficulty)}
                        color={getQuestionDifficultyColor(
                          questionRef.current.difficulty
                        )}
                        textColor={getQuestionDifficultyColor(
                          questionRef.current.difficulty
                        )}
                        ghost
                        small
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-x-1 font-ubuntu">
                    {questionRef.current?.completed && (
                      <>
                        {questionRef.current?.userCorrect ? (
                          <Check className="size-4 text-green-500" />
                        ) : (
                          <X className="size-4 text-destructive" />
                        )}
                        <div className="flex items-center gap-2">
                          <p className="text-sm">Answered</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </Link>
    </div>
  );
}
