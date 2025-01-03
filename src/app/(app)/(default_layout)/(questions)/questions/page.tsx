import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import GlobalPagination from '@/components/global/pagination';
import QuestionCard from '@/components/app/questions/question-card';

const Filter = dynamic(() => import('@/components/global/filters/filter'));

import FilterChips from '@/components/global/filters/chips';
import Hero from '@/components/global/hero';
import QuestionCardLoading from '@/components/app/questions/question-card-loading';
import QuestionPageSidebar from '@/components/app/questions/question-page-sidebar';

import { listQuestions } from '@/actions/questions/list';

import { useUserServer } from '@/hooks/use-user-server';
import QuestionPageSidebarLoading from '@/components/app/questions/question-page-sidebar-loading';
import { FilterParams, validateSearchParams } from '@/utils/search-params';
import { parseSearchParams } from '@/utils/search-params';

const ITEMS_PER_PAGE = 15;

export default async function QuestionsDashboard({
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
        heading="All Questions"
        subheading="Explore a diverse set of questions across multiple topics to enhance your knowledge."
      />
      <div className="md:container flex flex-col lg:flex-row mt-5 gap-16">
        <div className="w-full lg:w-[55%] space-y-6">
          <Filter />
          <FilterChips />
          <Suspense
            key={JSON.stringify(searchParams)}
            fallback={
              <>
                {[...Array(6)].map((_, i) => (
                  <QuestionCardLoading key={i} />
                ))}
              </>
            }
          >
            <QuestionsList
              userUid={user.uid}
              currentPage={filters.page}
              filters={filters}
            />
          </Suspense>
        </div>
        <Suspense fallback={<QuestionPageSidebarLoading />}>
          {user && <QuestionPageSidebar user={user} />}
        </Suspense>
      </div>
    </>
  );
}

async function QuestionsList({
  userUid,
  currentPage,
  filters,
}: {
  userUid: string;
  currentPage: number;
  filters: FilterParams;
}) {
  const data = await listQuestions({
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
    userUid,
    filters,
  });

  return (
    <>
      {data.questions.map((q) => (
        <QuestionCard key={q.uid} questionData={q} userUid={userUid} />
      ))}
      <div className="mt-5 w-full flex justify-center gap-x-2">
        <GlobalPagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          href="/questions"
          paramName="page"
        />
      </div>
    </>
  );
}
