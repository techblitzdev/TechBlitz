import { Suspense } from 'react';

import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
const DashboardBentoGrid = dynamic(
  () => import('../../../components/dashboard/dashboard-bento-grid')
);

// components
import CurrentStreak from '@/components/ui/current-streak';
import Feedback from '@/components/ui/feedback-button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ClientPage from './page.client';
import LoadingSpinner from '@/components/ui/loading';

// utils
import { getUserDisplayName } from '@/utils/user';
import { useUserServer } from '@/hooks/useUserServer';

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
            <div className="space-y-1">
              <SidebarTrigger className="lg:hidden" />
              <h1 className="text-xl md:text-3xl font-onest">
                Welcome back,{' '}
                <Suspense fallback={<LoadingSpinner />}>
                  <span>{getUserDisplayName(user)}</span>
                </Suspense>
              </h1>
              <p className="text-xs md:text-sm font-satoshi text-gray-400">
                Here's your daily dose of learning!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CurrentStreak />
              {/* <LanguageSwitcher /> */}
              <Feedback />
            </div>
          </div>
          <Separator className="bg-black-50" />
          <div className="h-full mt-1 px-6">
            <DashboardBentoGrid />
          </div>
        </div>
      </ClientPage>
    </Suspense>
  );
}
