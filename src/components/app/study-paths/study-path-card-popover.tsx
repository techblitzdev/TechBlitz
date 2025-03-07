import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Question } from '@/types/Questions';
import { StudyPath } from '@prisma/client';

interface StudyPathQuestionCardPopoverProps {
  children: Readonly<React.ReactNode>;
  questionData: Question;
  studyPath: StudyPath;
  isAnswered: boolean;
}

export default function StudyPathQuestionCardPopover({
  children,
  questionData,
  studyPath,
  isAnswered,
}: StudyPathQuestionCardPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent arrowPadding={10} className="bg-black-100 text-white border border-black-50">
        {' '}
        <div className="flex flex-col gap-y-4">
          {/** question title */}
          <p className="text-lg font-onest">{questionData.title}</p>

          {/** how much XP for this question */}
          <Button
            variant="secondary"
            fullWidth
            className="font-onest font-normal"
            href={`/question/${questionData.slug}?type=study-path&study-path=${studyPath.slug}`}
          >
            {isAnswered ? 'Recap Question' : 'Answer now +10XP'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
