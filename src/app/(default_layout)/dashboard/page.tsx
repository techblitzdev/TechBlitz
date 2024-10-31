import { getTodaysQuestion } from '@/actions/questions/get-today';
import DashboardBentoGrid from '@/components/dashboard/dashboard-bento-grid';
import LanguageSwitcher from '@/components/global/language-dropdown';
import UserProfileDropdown from '@/components/global/user-profile-dropdown';
import TodaysLeaderboardBentoBox from '@/components/leaderboard/bento-box';
import { Separator } from '@/components/ui/separator';

export default async function Dashboard() {
  const todaysQuestion = await getTodaysQuestion();

  return (
    <div className="text-white flex flex-col gap-y-4">
      <div className="flex w-full justify-between">
        <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
          Welcome back!
        </h1>
        <div className="flex item-center gap-x-3">
          <LanguageSwitcher />
          <div className="lg:hidden flex">
            <UserProfileDropdown />
          </div>
        </div>
        {/** userData?.userLevel === 'ADMIN' && <AdminButton /> */}
      </div>
      <Separator className="bg-black-50" />
      <DashboardBentoGrid />
    </div>
  );
}
