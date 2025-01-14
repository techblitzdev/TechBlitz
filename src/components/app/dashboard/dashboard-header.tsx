import CurrentStreak from '@/components/ui/current-streak';
import Feedback from '@/components/ui/feedback-button';
import SidebarLayoutTrigger from '@/components/global/navigation/sidebar-layout-trigger';

export default function DashboardHeader() {
  return (
    <div className="flex w-full justify-between px-6">
      <div className="flex items-center gap-3">
        <SidebarLayoutTrigger />
      </div>
      <div className="flex items-center gap-3">
        <CurrentStreak />
        <Feedback />
      </div>
    </div>
  );
}
