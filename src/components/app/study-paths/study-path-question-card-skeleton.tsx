import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';

export default function StudyPathQuestionCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-y-5 items-start bg-[#090909] border border-black-50 p-5 rounded-lg w-full relative overflow-hidden animate-pulse',
        className
      )}
    >
      <div className="flex w-full items-center justify-between gap-4 md:gap-5">
        <div className="flex items-center gap-x-2">
          <Circle className="flex-shrink-0 size-5 text-black-50" />
          <div className="h-6 bg-black-50 rounded w-3/4"></div>
        </div>
        <div className="h-5 w-5 bg-black-50 rounded"></div>
      </div>
    </div>
  );
}
