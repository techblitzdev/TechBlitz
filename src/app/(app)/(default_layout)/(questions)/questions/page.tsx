import { Suspense } from 'react';

import FilterChips from '@/components/global/filters/chips';
import Hero from '@/components/global/hero';
import QuestionPageSidebar from '@/components/app/questions/question-page-sidebar';
import Filter from '@/components/global/filters/filter';
import QuestionPageSidebarLoading from '@/components/app/questions/question-page-sidebar-loading';
import QuestionsList from '@/components/app/questions/questions-list';

import { useUserServer } from '@/hooks/use-user-server';
import { validateSearchParams } from '@/utils/search-params';
import { parseSearchParams } from '@/utils/search-params';
import { getTags } from '@/actions/questions/tags/get-tags';

export default async function QuestionsDashboard({
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
        heading="All Questions"
        subheading="Explore a diverse set of questions across multiple topics to enhance your knowledge."
      />
      <div className="md:container flex flex-col lg:flex-row mt-5 gap-16">
        <div className="w-full lg:min-w-[55%] space-y-6">
          <Filter tags={tags} />
          <FilterChips />
          <QuestionsList
            user={user}
            currentPage={filters.page}
            filters={filters}
            customQuestions={false}
          />
        </div>
        <Suspense fallback={<QuestionPageSidebarLoading />}>
          <QuestionPageSidebar user={user} />
        </Suspense>
      </div>
    </>
  );
}
