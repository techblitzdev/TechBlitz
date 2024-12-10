import { getUserFromDb, getUserFromSession } from '@/actions/user/get-user';
import DashboardBentoGrid from '@/components/dashboard/dashboard-bento-grid';
import CurrentStreak from '@/components/global/current-streak';
import Feedback from '@/components/global/feedback-button';
import LanguageSwitcher from '@/components/global/language-dropdown';
import UserProfileDropdown from '@/components/global/user-profile-dropdown';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { getUserDisplayName } from '@/utils/user';

export default async function Dashboard() {
  const user = await getUserFromSession();
  if (!user?.data?.user?.id) return null;
  const userData = await getUserFromDb(user?.data?.user?.id);
  if (!userData) return null;

  return (
    <div className="text-white flex flex-col gap-y-4 h-full">
      <div className="flex w-full justify-between px-6">
        <div className="space-y-1">
          <SidebarTrigger className="lg:hidden" />
          <h1 className="text-xl md:text-3xl font-onest">
            Welcome back, {getUserDisplayName(userData)}
          </h1>
          <p className="text-xs md:text-sm font-satoshi text-gray-400">
            Here's your daily dose of learning!
          </p>
        </div>
        <div className="flex gap-x-4 items-center">
          <div className="flex item-center gap-x-3">
            <CurrentStreak />
            {/* <LanguageSwitcher /> */}
            <div className="lg:hidden flex">
              <UserProfileDropdown />
            </div>
          </div>
          <Feedback />
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="h-full mt-1 px-6">
        <DashboardBentoGrid />
      </div>
    </div>
  );
}
