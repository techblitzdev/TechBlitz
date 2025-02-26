import SidebarLayoutTrigger from '@/components/app/navigation/sidebar-layout-trigger';
import CurrentStreak from '@/components/ui/current-streak';
import Feedback from '@/components/app/shared/feedback/feedback-button';
import { Separator } from '@/components/ui/separator';
import UpgradeModal from '@/components/app/shared/upgrade/upgrade-modal';

export default function StatisticsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-white flex flex-col gap-y-2 relative h-full">
      <div className="flex w-full items-center px-6 xl:container">
        <div className="flex-1">
          <SidebarLayoutTrigger />
        </div>
        <div className="flex items-center gap-x-3">
          <CurrentStreak />
          <Feedback icon={true} />
          <UpgradeModal />
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="container">{children}</div>
    </div>
  );
}
