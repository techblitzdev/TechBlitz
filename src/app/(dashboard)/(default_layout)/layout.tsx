import BackToDashboard from '@/components/global/back-to-dashboard';
import CurrentStreak from '@/components/global/current-streak';
import Feedback from '@/components/global/feedback-button';
import { Separator } from '@/components/ui/separator';

export default function StatisticsLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-white flex flex-col gap-y-4 relative h-full">
      <div className="flex w-full justify-between container">
        <BackToDashboard />
        <div className="flex items-center gap-x-4">
          <Feedback />
          <CurrentStreak />
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="container">{children}</div>
    </div>
  );
}
