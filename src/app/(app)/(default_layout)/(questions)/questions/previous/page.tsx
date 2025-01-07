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

import Hero from '@/components/global/hero';
import QuestionPageSidebarLoading from '@/components/app/questions/question-page-sidebar-loading';
import LoadingSpinner from '@/components/ui/loading';

import { useUserServer } from '@/hooks/use-user-server';
import { validateSearchParams } from '@/utils/search-params';
import { parseSearchParams } from '@/utils/search-params';
import { getTags } from '@/actions/questions/tags/get-tags';
import QuestionCardLoading from '@/components/app/questions/question-card-loading';
import FilterLoading from '@/components/global/filters/filters-loading';

export default async function PreviousQuestionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();
  const tags = await getTags();

  const filters = parseSearchParams(searchParams);
  if (!validateSearchParams(filters)) return null;

  return (
    <>
      <Hero
        heading="Previous Daily Questions"
        subheading="All daily questions that have been asked in the past."
      />
      <div className="flex flex-col h-full justify-between container mt-5">
        <div className="flex flex-col lg:flex-row w-full gap-16">
          <div className="w-full lg:min-w-[55%] space-y-6">
            <div className="min-h-[84px]">
              <Suspense fallback={<LoadingSpinner />}>
                <Filter tags={tags} />
                <FilterChips />
              </Suspense>
            </div>
            <QuestionsList
              user={user}
              currentPage={filters.page}
              filters={filters}
              customQuestions={false}
              previousQuestions={true}
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
