import DashboardBentoGrid from '@/components/dashboard/dashboard-bento-grid';
import LanguageSwitcher from '@/components/global/language-dropdown';
import UserProfileDropdown from '@/components/global/user-profile-dropdown';
import { Separator } from '@/components/ui/separator';

export default async function Dashboard() {
  return (
    <div className="text-white flex flex-col gap-y-4 h-full">
      <div className="flex w-full justify-between">
        <h1 className="text-xl md:text-4xl font-satoshi font-semibold">
          Overview
        </h1>
        <div className="flex item-center gap-x-3">
          <LanguageSwitcher />
          <div className="lg:hidden flex">
            <UserProfileDropdown />
          </div>
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="h-full mt-1">
        <DashboardBentoGrid />
      </div>
    </div>
  );
}
