import { Button } from '@/components/ui/button';
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Question } from '@/types/Questions';

interface StudyPathQuestionCardPopoverProps {
  children: Readonly<React.ReactNode>;
  questionData: Question;
}

export default function StudyPathQuestionCardPopover({
  children,
  questionData,
}: StudyPathQuestionCardPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent arrowPadding={10} className="bg-black-100 text-white border border-black-50">
        {' '}
        <div className="flex flex-col gap-y-2">
          {/** question title */}
          <p className="text-lg font-onest">{questionData.title}</p>

          {/** how much XP for this question */}
          <Button variant="secondary" fullWidth className="font-onest font-normal">
            Answer now +10XP
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
