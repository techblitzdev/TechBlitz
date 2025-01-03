import { Suspense } from 'react';

import { redirect } from 'next/navigation';

// components
import CurrentStreak from '@/components/ui/current-streak';
import Feedback from '@/components/ui/feedback-button';
import { Separator } from '@/components/ui/separator';
import ClientPage from './page.client';
import LoadingSpinner from '@/components/ui/loading';
import DashboardBentoGrid from '@/components/app/dashboard/dashboard-bento-grid';
import DashboardLoading from '@/components/app/dashboard/loading';

// utils
import { getUserDisplayName } from '@/utils/user';
import { useUserServer } from '@/hooks/use-user-server';
import SidebarLayoutTrigger from '@/components/global/navigation/sidebar-layout-trigger';

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();

  // middleware should handle this, no harm in adding here
  if (!user) redirect('/login');

  return (
    <Suspense fallback={null}>
      <ClientPage searchParams={searchParams}>
        <div className="text-white flex flex-col gap-y-4 h-full">
          <div className="flex w-full justify-between px-6">
            <div className="flex items-center gap-3">
              <SidebarLayoutTrigger />
              <h1 className="text-base md:text-3xl font-onest">
                Welcome back,{' '}
                <Suspense fallback={<LoadingSpinner />}>
                  <span>{getUserDisplayName(user)}</span>
                </Suspense>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <CurrentStreak />
              <Feedback />
            </div>
          </div>
          <Separator className="bg-black-50" />
          <div className="h-full mt-1 px-6">
            <Suspense fallback={<DashboardLoading />}>
              <DashboardBentoGrid />
            </Suspense>
          </div>
        </div>
      </ClientPage>
    </Suspense>
  );
}
