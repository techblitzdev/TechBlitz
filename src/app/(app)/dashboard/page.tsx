// components
import CurrentStreak from '@/components/ui/current-streak';
import Feedback from '@/components/ui/feedback-button';
import { Separator } from '@/components/ui/separator';
import ClientPage from './page.client';
import DashboardBentoGrid from '@/components/app/dashboard/dashboard-bento-grid';

// utils
import SidebarLayoutTrigger from '@/components/global/navigation/sidebar-layout-trigger';
import { useUserServer } from '@/hooks/use-user-server';
import { getUserDisplayName } from '@/utils/user';

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();

  return (
    <ClientPage searchParams={searchParams}>
      <div className="text-white flex flex-col gap-y-4 h-full">
        <div className="flex w-full justify-between px-6">
          <div className="flex items-center gap-3">
            <SidebarLayoutTrigger />
          </div>
          <div className="flex items-center gap-3">
            <CurrentStreak />
            <Feedback />
          </div>
        </div>
        <Separator className="bg-black-50" />
        <div className="h-full mt-1 max-w-7xl px-6 mx-auto flex flex-col gap-5">
          <h1 className="text-2xl font-bold">
            Welcome back, {getUserDisplayName(user)}
          </h1>
          <DashboardBentoGrid />
        </div>
      </div>
    </ClientPage>
  );
}
