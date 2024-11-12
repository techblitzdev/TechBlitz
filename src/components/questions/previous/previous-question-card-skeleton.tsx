import { Grid } from '@/components/ui/grid';
import { Skeleton } from '../../ui/skeleton';

export default function PreviousQuestionSkeleton() {
  return (
    <div className="space-y-5 items-start bg-black-75 border border-black-50 p-5 rounded-lg w-full h-auto flex flex-col relative overflow-hidden">
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between">
          {/* Question text skeleton */}
          <Skeleton className="w-3/4 bg-black" />
          {/* Arrow button skeleton */}
          <Skeleton className="size-10 bg-black" />
        </div>
        <div className="text-start space-y-2 mt-4">
          {/* Submissions skeleton */}
          <Skeleton className="w-32 h-4 bg-black" />
          {/* Correct submissions skeleton */}
          <Skeleton className="w-32 h-4 bg-black" />
        </div>
      </div>
      <div className="mt-5 w-full flex justify-between items-end">
        <div className="flex items-center gap-10">
          {/* Tags skeleton */}
          <div className="space-y-2">
            <Skeleton className="w-20 h-4 bg-black" />
            <div className="flex gap-2">
              <div className="w-12 h-6 bg-black-100 rounded" />
              <div className="w-12 h-6 bg-black-100 rounded" />
            </div>
          </div>
          {/* Difficulty skeleton */}
          <Skeleton className="w-20 h-6 bg-black" />
        </div>
        {/* Date skeleton */}
        <Skeleton className="w-20 h-6 bg-black" />
      </div>
      <Grid size={20} position="bottom-right" />
    </div>
  );
}
