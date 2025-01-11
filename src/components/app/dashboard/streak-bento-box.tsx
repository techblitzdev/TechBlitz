import ProgressChart from '@/components/marketing/homepage/features/progression-chart';

export default function StreakBentoBox() {
  return (
    <div className="space-y-4 group relative overflow-hidden p-4 h-full">
      <div className="space-y-1">
        <h6 className="text-xl">Statistics</h6>
      </div>
      <div className="w-full h-fit flex items-center justify-center absolute md:scale-150 md:-right-36 top-16 md:top-36">
        <ProgressChart hideHeader isStatic />
      </div>
    </div>
  );
}
