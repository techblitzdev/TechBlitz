import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Separator } from '@/components/ui/separator';
import ClientPage from './page.client';
import DashboardBentoGrid from '@/components/app/dashboard/dashboard-bento-grid';
import DashboardHeader from '@/components/app/dashboard/dashboard-header';
const WelcomeMessage = dynamic(
  () => import('@/components/app/dashboard/welcome-banner'),
  {
    loading: () => <h1 className="text-2xl font-bold">Welcome back,</h1>,
  }
);

interface DashboardProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  return (
    <ClientPage searchParams={searchParams}>
      <div className="text-white flex flex-col gap-y-4 h-full">
        <DashboardHeader />
        <Separator className="bg-black-50" />
        <div className="h-full mt-1 max-w-7xl px-6 mx-auto flex flex-col gap-5">
          <Suspense
            fallback={<h1 className="text-2xl font-bold">Welcome back,</h1>}
          >
            <WelcomeMessage />
          </Suspense>
          <DashboardBentoGrid />
        </div>
      </div>
    </ClientPage>
  );
}
