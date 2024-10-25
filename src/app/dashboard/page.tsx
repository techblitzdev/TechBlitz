import DashboardBentoGrid from '@/components/dashboard/dashboard-bento-grid';
import LanguageSwitcher from '@/components/global/language-dropdown';
import UserProfileDropdown from '@/components/global/user-profile-dropdown';
import { Separator } from '@/components/ui/separator';

export default async function Dashboard() {
  return (
    <div className="container py-6 lg:py-12 text-white flex flex-col gap-y-4">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-satoshi font-semibold">Welcome back!</h1>
        <div className="flex item-center gap-x-3">
          <LanguageSwitcher />
          <UserProfileDropdown />
        </div>
        {/** userData?.userLevel === 'ADMIN' && <AdminButton /> */}
      </div>
      <Separator />
      <DashboardBentoGrid />
    </div>
  );
}
