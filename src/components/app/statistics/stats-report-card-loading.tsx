'use client';

import { Skeleton } from '@/components/ui/skeleton';

import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';

export default function StatsReportCardSkeleton() {
  return (
    <Link href="#" className="w-full h-auto transition-all duration-200 pointer-events-none">
      <div className="space-y-4 border border-black-50 p-5 rounded-lg relative overflow-hidden">
        {/* Header */}
        <div className="flex w-full justify-between items-center">
          <Skeleton className="h-6 w-3/4" />
          <MoreHorizontal className="size-4 text-gray-300" />
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="size-3 rounded-full" />
          </div>

          <Skeleton className="h-2 w-full" />
        </div>
      </div>
    </Link>
  );
}
