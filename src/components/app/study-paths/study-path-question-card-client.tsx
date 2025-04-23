'use client';

import type { Question } from '@/types';
import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';
import Lock from '@/components/ui/icons/lock';
import Check from '@/components/ui/icons/check';
import ERemove from '@/components/ui/icons/e-remove';
import StudyPathQuestionCardPopover from './study-path-card-popover';
import { StudyPath } from '@prisma/client';
import { useQuestionSingle } from '@/contexts/question-single-context';

const buttonColorMap = {
  correct: {
    base: 'bg-green-500',
    '3dShade': 'bg-green-600',
    hover: 'bg-green-600',
    active: 'bg-green-700',
    boxShadow: '[box-shadow:0_8px_0_0_#16a34a,0_9px_0_0_#16a34a]',
  },
  incorrect: {
    base: 'bg-red-500',
    '3dShade': 'bg-red-600',
    hover: 'bg-red-600',
    active: 'bg-red-700',
    boxShadow: '[box-shadow:0_8px_0_0_#dc2626,0_9px_0_0_#dc2626]',
  },
  unanswered: {
    base: 'bg-[#191919]',
    '3dShade': 'bg-[#0e0e0e]',
    hover: 'bg-black-100',
    active: 'bg-black-100',
    boxShadow: '[box-shadow:0_8px_0_0_#0e0e0e,0_9px_0_0_#0e0e0e]',
  },
  premium: {
    base: 'bg-[#191919]',
    '3dShade': 'bg-[#0e0e0e]',
    hover: 'bg-black-100',
    active: 'bg-black-100',
    boxShadow: '[box-shadow:0_8px_0_0_#ca8a04,0_9px_0_0_#ca8a04]',
  },
  next: {
    base: 'bg-[#191919]',
    '3dShade': 'bg-accent/80',
    hover: 'bg-black-100',
    active: 'bg-black-100',
    boxShadow: '[box-shadow:0_8px_0_0_#7c3aed,0_9px_0_0_#7c3aed]',
  },
  locked: {
    base: 'bg-[#191919]',
    '3dShade': 'bg-[#0e0e0e]',
    hover: 'bg-black-100',
    active: 'bg-black-100',
    boxShadow: '[box-shadow:0_8px_0_0_#4b5563,0_9px_0_0_#4b5563]',
  },
};

export default function StudyPathQuestionCardClient({
  questionData,
  isNextQuestion,
  studyPath,
  lessonIndex,
}: {
  questionData: Question;
  isNextQuestion?: boolean;
  studyPath: StudyPath;
  lessonIndex?: number;
}) {
  const iconSize = '32';
  const { user } = useQuestionSingle();

  // Define our lock states
  const isPremiumQuestion = questionData?.isPremiumQuestion;
  const isPremiumUser = user?.userLevel === 'PREMIUM';
  const isPremiumLocked = isPremiumQuestion && !isPremiumUser;

  // Determine the status for visual styling
  const isCompleted = questionData.userAnswers && questionData.userAnswers.length > 0;
  const isCorrect = isCompleted && questionData?.userAnswers?.[0]?.correctAnswer;

  // Question is sequence-locked if it's not completed, not the next question, and not premium-locked
  const isSequenceLocked = !isCompleted && !isNextQuestion && !isPremiumLocked;

  // Determine if user can actually interact with the question
  const canInteract = (isCompleted || isNextQuestion) && !isPremiumLocked;

  // Explicitly convert to boolean for type safety
  const canInteractBool: boolean = !!canInteract;
  const isCorrectBool: boolean = isCorrect === true;
  const isNextQuestionBool: boolean = !!isNextQuestion;

  // Get wrapper border color based on status
  const getWrapperBorderColor = () => {
    if (isPremiumLocked) return 'border-yellow-500';
    if (isCorrect) return 'border-green-500';
    if (isCompleted && !isCorrect) return 'border-red-500';
    if (isNextQuestion) return 'border-accent';
    return 'border-transparent';
  };

  // Get button style based on status
  const getButtonStyle = () => {
    if (isPremiumLocked) return buttonColorMap.premium;
    if (isCorrect) return buttonColorMap.correct;
    if (isCompleted && !isCorrect) return buttonColorMap.incorrect;
    if (isNextQuestion) return buttonColorMap.next;
    return buttonColorMap.unanswered;
  };

  const buttonStyle = getButtonStyle();

  return (
    <div className="relative group perspective-1000 flex items-center justify-center">
      {/* Wrapper element with colored border */}
      <div
        className={cn(
          'absolute -inset-4 rounded-full border-4 transition-all duration-300 transform-gpu',
          getWrapperBorderColor(),
          isCorrect && 'animate-pulse-slow',
          'group-hover:rotate-2 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-accent/20',
          'group-active:rotate-1 group-active:scale-95'
        )}
      />

      {/* The card itself */}
      <StudyPathQuestionCardPopover
        questionData={questionData}
        studyPath={studyPath}
        isAnswered={isCorrectBool}
        canAnswer={canInteractBool}
        isNextQuestion={isNextQuestionBool}
        isPremiumLocked={isPremiumLocked}
        isSequenceLocked={isSequenceLocked}
        lessonIndex={lessonIndex}
      >
        <div
          key={questionData.uid}
          className={cn(
            'w-24 h-[90px] justify-center items-center flex flex-col gap-y-5 duration-300 p-5 rounded-full group relative transition-all mb-2',
            buttonStyle.base,
            'transform-gpu',
            'before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-black-100/30 before:to-transparent before:opacity-70',
            'after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-t after:from-black-100/30 after:to-transparent after:opacity-30 after:translate-y-1/2',
            'hover:translate-y-[1px]',
            'active:translate-y-[1px] active:rotate-1 active:scale-95',
            'transform-style-3d',
            'backface-visibility-hidden',
            'cursor-pointer select-none',
            'active:translate-y-2 active:[box-shadow:0_0px_0_0_#191919,0_0px_0_0_#191919]',
            'active:border-b-[0px]',
            'transition-all duration-150',
            buttonStyle.boxShadow
          )}
        >
          <div className="flex w-full items-center justify-center gap-4 md:gap-5 relative z-10">
            <div
              className={cn(
                'flex items-center justify-center rounded-full transition-all',
                isCorrect && 'animate-pulse-slow'
              )}
            >
              {isPremiumLocked ? (
                <div className="relative animate-pulse-slow drop-shadow-md">
                  <Lock primaryColor="#EAB308" secondaryColor="#FEF08A" height="40" width="40" />
                </div>
              ) : questionData.userAnswers && questionData.userAnswers.length > 0 ? (
                questionData.userAnswers[0].correctAnswer ? (
                  <div className="relative">
                    <Check fill="white" strokewidth={2} height={iconSize} width={iconSize} />
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-70 transition-opacity"></div>
                  </div>
                ) : (
                  <div className="relative">
                    <ERemove fill="white" strokewidth={2} height={iconSize} width={iconSize} />
                    <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-70 transition-opacity"></div>
                  </div>
                )
              ) : (
                <Circle className="flex-shrink-0 size-6 text-black-50 group-hover:text-accent transition-colors drop-shadow-md" />
              )}
            </div>
          </div>
        </div>
      </StudyPathQuestionCardPopover>
    </div>
  );
}
