'use client';

import { Question } from '@/types/Questions';
import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';
import { StudyPath } from '@prisma/client';
import Check from '@/components/ui/icons/check';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getButtonStyle } from '@/utils/roadmaps';

interface SubSectionData {
  key: string;
  sectionName: string;
  questionSlugs: string[];
  questions: Question[];
  completionPercentage: number;
  isIncomplete: boolean;
  isFirstIncompleteSubSection: boolean;
  sectionSlug?: string;
}

export default function SubSectionCardClient({
  subSection,
  studyPath,
  nextQuestionIndex,
}: {
  subSection: SubSectionData;
  studyPath: StudyPath;
  nextQuestionIndex?: number;
}) {
  const iconSize = '32';
  const [animateRing, setAnimateRing] = useState(false);

  // Calculate the subsection completion metrics
  const completionPercentage = subSection.completionPercentage;
  const isFirstIncomplete = subSection.isFirstIncompleteSubSection;

  // Trigger animation on component mount
  useEffect(() => {
    // Small delay to ensure the animation is visible after component is rendered
    const timer = setTimeout(() => {
      setAnimateRing(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Get button style based on status
  const buttonStyle = getButtonStyle({
    completionPercentage,
    isFirstIncomplete,
  });

  // URL for accessing the subsection
  const getButtonHref = () => {
    // Use sectionSlug if available, otherwise fall back to key
    const urlPath = subSection.sectionSlug || subSection.key;

    // For completed subsections, allow users to start from the beginning (lesson=0)
    if (completionPercentage === 100) {
      return `/roadmap/learn/${studyPath.slug}/${urlPath}/lesson?lesson=testing`;
    }

    // If this is not the first incomplete subsection, disable access
    if (!isFirstIncomplete && completionPercentage < 100) {
      return 'javascript:void(0)'; // Prevent navigation
    }

    // For in-progress or not started subsections
    if (!nextQuestionIndex && nextQuestionIndex !== 0) {
      // If nextQuestionIndex is undefined or null, start from the beginning
      return `/roadmap/learn/${studyPath.slug}/${urlPath}/lesson?lesson=0`;
    }

    // Otherwise use the next question index
    return `/roadmap/learn/${studyPath.slug}/${urlPath}/lesson?lesson=${nextQuestionIndex}`;
  };

  // Determine the button text based on state
  const getButtonText = () => {
    // if this is not the next subsection, return that it is locked
    if (!isFirstIncomplete && completionPercentage < 100) {
      return 'Locked';
    }

    if (completionPercentage === 100) return 'Review Section';
    if (isFirstIncomplete) return 'Continue Learning';
    if (completionPercentage > 0) return 'Continue';
    return 'Start Section';
  };

  // Calculate the progress ring styles
  const getProgressRingStyles = () => {
    // Calculate the circumference of the circle
    const radius = 60; // Slightly larger than the button radius
    const circumference = 2 * Math.PI * radius;

    // Calculate the dash offset based on completion percentage
    const dashOffset = circumference * (1 - completionPercentage / 100);

    return {
      radius,
      circumference,
      dashOffset,
    };
  };

  const progressRing = getProgressRingStyles();

  return (
    <div className="relative group perspective-1000 flex items-center justify-center">
      {/* Wrapper element with colored border and progress ring */}
      <div
        className={cn(
          'absolute -inset-4 rounded-full transition-all duration-300 transform-gpu',
          completionPercentage === 100 && 'animate-pulse-slow',
          'group-hover:rotate-2 group-hover:scale-105',
          'group-active:rotate-1 group-active:scale-95'
        )}
      >
        {/* Progress ring SVG */}
        {completionPercentage > 0 && (
          <svg className="absolute inset-0 w-full h-full -rotate-90 transform-gpu">
            <circle
              cx="50%"
              cy="50%"
              r={progressRing.radius}
              fill="none"
              strokeWidth="4"
              stroke={
                completionPercentage === 100
                  ? 'rgb(34, 197, 94)'
                  : isFirstIncomplete
                  ? 'rgb(124, 58, 237)'
                  : 'rgb(59, 130, 246)'
              }
              strokeDasharray={progressRing.circumference}
              strokeDashoffset={animateRing ? progressRing.dashOffset : progressRing.circumference}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                transformOrigin: 'center',
                transform: 'rotate(-90deg)',
              }}
            />
          </svg>
        )}
      </div>

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
              disabled={!isFirstIncomplete && completionPercentage < 100}
            >
              {getButtonText()}
              {nextQuestionIndex}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
