"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuestionCardLoading() {
  return (
    <div className="space-y-5 items-start border border-black-50 p-5 rounded-lg group w-full h-auto flex flex-col relative overflow-hidden">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex items-center gap-x-3">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}
