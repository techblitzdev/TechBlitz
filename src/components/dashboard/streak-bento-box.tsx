import { Suspense } from 'react';
import ProgressChart from '../marketing/homepage/features/progression-chart';

export default function StreakBentoBox() {
  return (
    <div className="space-y-4 group relative overflow-hidden p-4 h-full">
      <div className="space-y-1">
        <h6 className="text-xl">Statistics</h6>
      </div>
      <div className="w-full h-fit flex items-center justify-center absolute">
        <Suspense fallback={null}>
          <ProgressChart hideHeader={true} isStatic={true} />
        </Suspense>
      </div>
    </div>
  );
}
