'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function RoadmapsCardSkeleton() {
  return (
    <div className="py-6 mb-6 space-y-5 items-start border border-black-50 p-5 rounded-lg group w-full h-auto flex flex-col relative overflow-hidden">
      <div className="flex w-full justify-between gap-3">
        <div className="flex flex-col gap-y-3 font-ubuntu w-full">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="mt-5 w-full flex justify-between items-end relative z-10">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </div>
  );
}
