import CurrentStreak from '@/components/ui/current-streak';
import UpgradeModal from '@/components/app/shared/upgrade/upgrade-modal';
import UserXp from '@/components/ui/user-xp';

export default function StatisticsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-white flex flex-col gap-y-4 relative h-full">
      <div className="container">
        <div className="flex items-center gap-x-3 lg:container w-full justify-end">
          <CurrentStreak />
          <UserXp />
          <UpgradeModal />
        </div>
      </div>
      <div className="container">{children}</div>
    </div>
  );
}
