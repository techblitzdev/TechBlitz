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
    <div
      className={cn(
        'p-4 border border-black-50 bg-black-75 shadow-sm rounded-lg',
        className
      )}
    >
      <div className="font-inter">
        <h2 className="text-lg font-semibold">Today's Task</h2>
        <p className="mt-2 text-sm">{question.question}</p>
      </div>
    </div>
  );
}
