import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { Question } from '@/types';
import { getUpgradeUrl } from '@/utils';
import { QUESTION_XP } from '@/utils/constants/question-xp';
import { StudyPath } from '@prisma/client';

interface StudyPathQuestionCardPopoverProps {
  children: Readonly<React.ReactNode>;
  questionData: Question;
  studyPath: StudyPath;
  isAnswered: boolean;
  canAnswer: boolean;
  isNextQuestion?: boolean;
  isPremiumLocked?: boolean;
  isSequenceLocked?: boolean;
  lessonIndex?: number;
}

export default function StudyPathQuestionCardPopover({
  children,
  questionData,
  studyPath,
  isAnswered,
  canAnswer,
  isNextQuestion,
  isPremiumLocked,
  isSequenceLocked,
  lessonIndex,
}: StudyPathQuestionCardPopoverProps) {
  const xp = QUESTION_XP[questionData.difficulty] || 5;

  // Determine the correct URL and button state
  const getButtonHref = () => {
    // If premium locked, direct to upgrade page
    if (isPremiumLocked) {
      return getUpgradeUrl();
    }

    // If it's the next question or already answered, allow access
    if (isNextQuestion || isAnswered || canAnswer) {
      // Since this is not a subsection but a direct question, we use 'main' as the subsection
      return `/roadmap/learn/${studyPath.slug}/main/lesson?lesson=${
        lessonIndex !== undefined ? lessonIndex : 0
      }`;
    }

    // Otherwise (sequence locked), stay on current page
    return '#';
  };

  // Determine the button text based on state
  const getButtonText = () => {
    if (isAnswered) return 'Question Recap';
    if (isPremiumLocked) return 'Upgrade to Access';
    if (isSequenceLocked) return 'Locked';
    if (isNextQuestion || canAnswer) return `Answer now +${xp}XP`;
    return 'Start';
  };

  // Determine if button should be disabled
  const isDisabled = isSequenceLocked === true;

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent arrowPadding={10} className="bg-black-100 text-white border border-black-50">
        <div className="flex flex-col gap-y-4">
          {/** question title */}
          <p className="text-lg font-onest">{questionData.title}</p>

          {/** how much XP for this question */}
          <Button
            variant={isDisabled ? 'default' : 'secondary'}
            fullWidth
            className="font-onest font-normal disabled:opacity-50"
            href={getButtonHref()}
            disabled={isDisabled}
          >
            {getButtonText()}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
