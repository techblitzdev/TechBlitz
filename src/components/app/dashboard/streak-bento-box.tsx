import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ProgressChart = dynamic(
  () => import('@/components/marketing/homepage/features/progression-chart'),
  {
    ssr: false,
  }
);

export default function StreakBentoBox() {
  return (
    <div className="space-y-4 group relative overflow-hidden p-4 h-full">
      <div className="space-y-1">
        <h6 className="text-xl">Statistics</h6>
      </div>
      <div className="w-full h-fit flex items-center justify-center absolute md:scale-150 md:-right-36 top-16 md:top-36">
        <Suspense
          fallback={<div className="min-h-[430px] w-full animate-pulse"></div>}
        >
          <ProgressChart hideHeader isStatic />
        </Suspense>
      </div>
    </div>
  );
}
