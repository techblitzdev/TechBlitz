'use client';

import { Question } from '@/types/Questions';
import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';
import { StudyPath } from '@prisma/client';
import { useQuestionSingle } from '@/contexts/question-single-context';
import Check from '@/components/ui/icons/check';
import ERemove from '@/components/ui/icons/e-remove';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface SubSectionData {
  key: string;
  sectionName: string;
  questionSlugs: string[];
  questions: Question[];
  completionPercentage: number;
  isIncomplete: boolean;
  isFirstIncompleteSubSection: boolean;
}

const buttonColorMap = {
  completed: {
    base: 'bg-green-500',
    '3dShade': 'bg-green-600',
    hover: 'bg-green-600',
    active: 'bg-green-700',
    boxShadow: '[box-shadow:0_8px_0_0_#16a34a,0_9px_0_0_#16a34a]',
  },
  inProgress: {
    base: 'bg-[#191919]',
    '3dShade': 'bg-[#0e0e0e]',
    hover: 'bg-black-100',
    active: 'bg-black-100',
    boxShadow: '[box-shadow:0_8px_0_0_#0e0e0e,0_9px_0_0_#0e0e0e]',
  },
  nextUp: {
    base: 'bg-[#191919]',
    '3dShade': 'bg-accent/80',
    hover: 'bg-black-100',
    active: 'bg-black-100',
    boxShadow: '[box-shadow:0_8px_0_0_#7c3aed,0_9px_0_0_#7c3aed]',
  },
  notStarted: {
    base: 'bg-[#191919]',
    '3dShade': 'bg-[#0e0e0e]',
    hover: 'bg-black-100',
    active: 'bg-black-100',
    boxShadow: '[box-shadow:0_8px_0_0_#0e0e0e,0_9px_0_0_#0e0e0e]',
  },
};

export default function SubSectionCardClient({
  subSection,
  studyPath,
  sectionIndex,
}: {
  subSection: SubSectionData;
  studyPath: StudyPath;
  sectionIndex: number;
}) {
  const { user } = useQuestionSingle();
  const iconSize = '32';

  // Calculate the subsection completion metrics
  const completionPercentage = subSection.completionPercentage;
  const isFirstIncomplete = subSection.isFirstIncompleteSubSection;

  // Get wrapper border color based on status
  const getWrapperBorderColor = () => {
    if (completionPercentage === 100) return 'border-green-500';
    if (isFirstIncomplete) return 'border-accent';
    if (completionPercentage > 0) return 'border-blue-500';
    return 'border-transparent';
  };

  // Get button style based on status
  const getButtonStyle = () => {
    if (completionPercentage === 100) {
      return buttonColorMap.completed;
    }

    if (isFirstIncomplete) {
      return buttonColorMap.nextUp;
    }

    if (completionPercentage > 0) {
      return buttonColorMap.inProgress;
    }

    return buttonColorMap.notStarted;
  };

  const buttonStyle = getButtonStyle();

  // Find the first unanswered question in this subsection
  const firstUnansweredQuestion = subSection.questions.find(
    (q) => !q.userAnswers?.length || q.userAnswers.some((a) => a.correctAnswer === false)
  );

  // URL for accessing the subsection
  const getButtonHref = () => {
    if (firstUnansweredQuestion) {
      return `/roadmaps/${studyPath.slug}/${firstUnansweredQuestion.slug}`;
    }
    return `/roadmaps/${studyPath.slug}`;
  };

  // Determine the button text based on state
  const getButtonText = () => {
    if (completionPercentage === 100) return 'Completed';
    if (isFirstIncomplete) return 'Continue Learning';
    if (completionPercentage > 0) return 'Continue';
    return 'Start Section';
  };

  return (
    <div className="relative group perspective-1000 flex items-center justify-center">
      {/* Wrapper element with colored border */}
      <div
        className={cn(
          'absolute -inset-4 rounded-full border-4 transition-all duration-300 transform-gpu',
          getWrapperBorderColor(),
          completionPercentage === 100 && 'animate-pulse-slow',
          'group-hover:rotate-2 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-accent/20',
          'group-active:rotate-1 group-active:scale-95'
        )}
      />

      <Popover>
        <PopoverTrigger>
          <div
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
                  completionPercentage === 100 && 'animate-pulse-slow'
                )}
              >
                {completionPercentage === 100 ? (
                  <div className="relative">
                    <Check fill="white" strokewidth={2} height={iconSize} width={iconSize} />
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-70 transition-opacity"></div>
                  </div>
                ) : completionPercentage > 0 ? (
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">
                        {Math.round(completionPercentage)}%
                      </span>
                    </div>
                    <Circle className="flex-shrink-0 size-6 text-white/30 group-hover:text-accent transition-colors drop-shadow-md" />
                  </div>
                ) : (
                  <Circle className="flex-shrink-0 size-6 text-black-50 group-hover:text-accent transition-colors drop-shadow-md" />
                )}
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          arrowPadding={10}
          className="bg-black-100 text-white border border-black-50"
        >
          <div className="flex flex-col gap-y-4">
            {/* Section title */}
            <p className="text-lg font-onest">{subSection.sectionName}</p>
            <p className="text-sm text-gray-400">
              {subSection.questions.length}{' '}
              {subSection.questions.length === 1 ? 'question' : 'questions'} •
              {completionPercentage === 100
                ? ' Completed'
                : isFirstIncomplete
                ? ' Next up'
                : completionPercentage > 0
                ? ' In progress'
                : ' Not started'}
            </p>

            {/* Action button */}
            <Button
              variant="secondary"
              fullWidth
              className="font-onest font-normal"
              href={getButtonHref()}
            >
              {getButtonText()}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
