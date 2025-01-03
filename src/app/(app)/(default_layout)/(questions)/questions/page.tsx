import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Filter = dynamic(() => import('@/components/global/filters/filter'));

import FilterChips from '@/components/global/filters/chips';
import Hero from '@/components/global/hero';
import QuestionPageSidebar from '@/components/app/questions/question-page-sidebar';

import { useUserServer } from '@/hooks/use-user-server';
import QuestionPageSidebarLoading from '@/components/app/questions/question-page-sidebar-loading';
import { validateSearchParams } from '@/utils/search-params';
import { parseSearchParams } from '@/utils/search-params';
import QuestionsList from '@/components/app/questions/questions-list';

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
          <QuestionsList
            user={user}
            currentPage={filters.page}
            filters={filters}
            customQuestions={false}
          />
        </div>
        <Suspense fallback={<QuestionPageSidebarLoading />}>
          {user && <QuestionPageSidebar user={user} />}
        </Suspense>
      </div>
    </>
  );
}
