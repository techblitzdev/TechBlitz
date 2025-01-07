import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const FilterChips = dynamic(() => import('@/components/global/filters/chips'), {
  ssr: false,
});

const Filter = dynamic(() => import('@/components/global/filters/filter'), {
  ssr: false,
  loading: () => <FilterLoading />,
});

const QuestionsList = dynamic(
  () => import('@/components/app/questions/questions-list'),
  {
    ssr: false,
    loading: () => (
      <>
        {Array.from({ length: 10 }).map((_, index) => (
          <QuestionCardLoading key={index} />
        ))}
      </>
    ),
  }
);

const QuestionPageSidebar = dynamic(
  () => import('@/components/app/questions/question-page-sidebar'),
  {
    ssr: false,
    loading: () => <QuestionPageSidebarLoading />,
  }
);

// Components
import Hero from '@/components/global/hero';
import QuestionPageSidebarLoading from '@/components/app/questions/question-page-sidebar-loading';
import QuestionCardLoading from '@/components/app/questions/question-card-loading';
import FilterLoading from '@/components/global/filters/filters-loading';

// Hooks
import { useUserServer } from '@/hooks/use-user-server';

// Utils
import { parseSearchParams, validateSearchParams } from '@/utils/search-params';
import { getTags } from '@/actions/questions/tags/get-tags';
import { redirect } from 'next/navigation';

export default async function CustomQuestionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // we need an authed user to view this page
  const user = await useUserServer();
  if (!user) redirect('/login');

  const tags = await getTags();

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
          <div className="w-full lg:min-w-[55%] space-y-6">
            <div className="min-h-[84px]">
              <Filter tags={tags} showSort={false} />
              <FilterChips />
            </div>
            <QuestionsList
              user={user}
              currentPage={filters.page}
              filters={filters}
              customQuestions={true}
              previousQuestions={false}
            />
          </div>
          <Suspense fallback={<QuestionPageSidebarLoading />}>
            <QuestionPageSidebar user={user} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
