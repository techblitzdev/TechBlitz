import QuestionsList from '@/components/app/questions/layout/questions-list';
import QuestionPageSidebar from '@/components/app/questions/layout/question-page-sidebar';

// Components
import Hero from '@/components/global/hero';

// Hooks
import { useUserServer } from '@/hooks/use-user-server';

// Utils
import { parseSearchParams, validateSearchParams } from '@/utils/search-params';
import { redirect } from 'next/navigation';

export default async function CustomQuestionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // we need an authed user to view this page
  const user = await useUserServer();
  if (!user) redirect('/login');

  const filters = parseSearchParams(searchParams);
  if (!validateSearchParams(filters)) return null;

  return (
    <>
      <Hero
        heading="Custom Questions"
        subheading="Questions created just for you."
      />
      <div className="flex flex-col h-full justify-between container mt-5">
        <div className="flex flex-col lg:flex-row w-full gap-16">
          <div className="w-full lg:min-w-[65%] space-y-6">
            <QuestionsList
              currentPage={filters.page}
              filters={filters}
              customQuestions
              showSubmissions={false}
              paginationUrl="/questions/custom"
            />
          </div>
          <QuestionPageSidebar />
        </div>
      </div>
    </>
  );
}
