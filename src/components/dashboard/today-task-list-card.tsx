import { Question } from '@/types/Questions';
import { cn } from '@/lib/utils';

type TodayTaskListCardProps = {
  question: Question;
  className?: string;
};

export default function TodayTaskListCard({
  question,
  className,
}: TodayTaskListCardProps) {
  return (
    <div className={cn('p-4 bg-black shadow-sm rounded-lg', className)}>
      <div className="font-inter">
        <p className="mt-2 text-sm">{question.question}</p>
      </div>
    </div>
  );
}
