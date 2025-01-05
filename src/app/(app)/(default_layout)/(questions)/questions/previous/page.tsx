import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import QuestionPageSidebar from '@/components/app/questions/question-page-sidebar';
import Hero from '@/components/global/hero';

import FilterChips from '@/components/global/filters/chips';

import { useUserServer } from '@/hooks/use-user-server';
import QuestionPageSidebarLoading from '@/components/app/questions/question-page-sidebar-loading';
import { validateSearchParams } from '@/utils/search-params';
import { parseSearchParams } from '@/utils/search-params';
import QuestionsList from '@/components/app/questions/questions-list';

const FiltersWrapper = dynamic(
  () => import('@/components/global/filters/filters-wrapper')
);

export default async function PreviousQuestionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();

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
            <FiltersWrapper />
            <FilterChips />
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
