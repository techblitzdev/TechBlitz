import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import GlobalPagination from '@/components/global/pagination';
import QuestionCard from '@/components/app/questions/question-card';
import QuestionCardLoading from '@/components/app/questions/question-card-loading';
import QuestionPageSidebar from '@/components/app/questions/question-page-sidebar';
import Hero from '@/components/global/hero';
const Filter = dynamic(() => import('@/components/global/filters/filter'));

import FilterChips from '@/components/global/filters/chips';

import { getPreviousQuestions } from '@/actions/questions/get-previous';
import { useUserServer } from '@/hooks/use-user-server';
import QuestionPageSidebarLoading from '@/components/app/questions/question-page-sidebar-loading';
import { FilterParams, validateSearchParams } from '@/utils/search-params';
import { parseSearchParams } from '@/utils/search-params';

const ITEMS_PER_PAGE = 20;

export default async function PreviousQuestionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();
  if (!user) return null;

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
          <div className="w-full lg:w-[55%] space-y-6">
            <Filter />
            <FilterChips />
            <Suspense
              fallback={
                <>
                  {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                    <QuestionCardLoading key={i} />
                  ))}
                </>
              }
            >
              <PreviousQuestionsList
                currentPage={filters.page}
                filters={filters}
              />
            </Suspense>
          </div>
          <Suspense fallback={<QuestionPageSidebarLoading />}>
            {user && <QuestionPageSidebar user={user} />}
          </Suspense>
        </div>
      </div>
    </>
  );
}

async function PreviousQuestionsList({
  currentPage,
  filters,
}: {
  currentPage: number;
  filters: FilterParams;
}) {
  const user = await useUserServer();
  if (!user) return null;

  const data = await getPreviousQuestions({
    user,
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
    filters,
  });

  return (
    <>
      {data?.questions.map((q) => (
        <QuestionCard key={q.uid} questionData={q} userUid={user.uid} />
      ))}
      <div className="mt-5 w-full flex justify-center gap-x-2">
        <GlobalPagination
          currentPage={currentPage}
          totalPages={data?.totalPages || 1}
          href="/previous-questions"
          paramName="page"
        />
      </div>
    </>
  );
}
