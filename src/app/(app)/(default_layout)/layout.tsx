import SidebarLayoutTrigger from '@/components/app/navigation/sidebar-layout-trigger';
import CurrentStreak from '@/components/ui/current-streak';
import UpgradeModal from '@/components/app/shared/upgrade/upgrade-modal';
import UserXp from '@/components/ui/user-xp';

export default function StatisticsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-white flex flex-col gap-y-4 relative h-full container">
      <div className="flex w-full items-center">
        <div className="flex-1">
          <SidebarLayoutTrigger />
        </div>
        <div className="flex items-center gap-x-3">
          <CurrentStreak />
          <UserXp />
          <UpgradeModal />
        </div>
      </div>
      {children}
    </div>
  );
}
