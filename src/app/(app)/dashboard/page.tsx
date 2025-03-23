import ClientPage from './page.client';
import DashboardBentoGrid from '@/components/app/dashboard/dashboard-bento-grid';
import DashboardHeader from '@/components/app/dashboard/dashboard-header';
import { useUserServer } from '@/hooks/use-user-server';
import { userHasAnsweredAnyQuestion } from '@/utils/data/questions/user-has-answered-any-question';

interface DashboardProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const user = useUserServer();

  const hasAnsweredAnyQuestion = userHasAnsweredAnyQuestion({
    numberOfQuestions: 1,
  });

  return (
    <ClientPage
      searchParams={searchParams}
      userPromise={user}
      hasAnsweredAnyQuestionPromise={hasAnsweredAnyQuestion}
    >
      <div className="text-white flex flex-col gap-y-4 h-full">
        <DashboardHeader />
        <div className="h-full mt-1 max-w-7xl px-6 mx-auto flex flex-col gap-5">
          <DashboardBentoGrid />
        </div>
      </div>
    </ClientPage>
  );
}
