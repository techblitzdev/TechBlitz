import { Question } from '@/types/Questions';
import { cn } from '@/utils/cn';

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
        'h-full w-full bg-black bg-dot-white/[0.2] relative flex p-5 rounded-sm',
        className
      )}
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="mt-2 text-sm">{question.question}</p>
    </div>
  );
}
