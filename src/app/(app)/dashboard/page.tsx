import { Separator } from '@/components/ui/separator';
import ClientPage from './page.client';
import DashboardBentoGrid from '@/components/app/dashboard/dashboard-bento-grid';
import DashboardHeader from '@/components/app/dashboard/dashboard-header';
import { useUserServer } from '@/hooks/use-user-server';

interface DashboardProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const user = useUserServer();

  return (
    <ClientPage searchParams={searchParams} userPromise={user}>
      <div className="text-white flex flex-col gap-y-2 h-full">
        <DashboardHeader />
        <Separator className="bg-black-50" />
        <div className="h-full mt-1 max-w-7xl px-6 mx-auto flex flex-col gap-5">
          <DashboardBentoGrid />
        </div>
      </div>
    </ClientPage>
  );
}
