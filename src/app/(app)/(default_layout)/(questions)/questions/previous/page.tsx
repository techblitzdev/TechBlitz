import dynamic from 'next/dynamic';

const FilterChips = dynamic(() => import('@/components/global/filters/chips'), {
  ssr: false,
});

const Filter = dynamic(() => import('@/components/global/filters/filter'), {
  ssr: false,
  loading: () => <FilterLoading />,
});

import QuestionsList from '@/components/app/questions/questions-list';

import QuestionPageSidebar from '@/components/app/questions/question-page-sidebar';

import Hero from '@/components/global/hero';

import { useUserServer } from '@/hooks/use-user-server';
import { validateSearchParams } from '@/utils/search-params';
import { parseSearchParams } from '@/utils/search-params';
import { getTags } from '@/utils/data/questions/tags/get-tags';
import FilterLoading from '@/components/global/filters/filters-loading';

export default async function PreviousQuestionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [user, tags] = await Promise.all([useUserServer(), getTags()]);

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
            <div className="min-h-[84px] flex flex-col gap-y-2">
              <Filter tags={tags} />
              <FilterChips />
            </div>
            <QuestionsList
              user={user}
              currentPage={filters.page}
              filters={filters}
              customQuestions={false}
              previousQuestions={true}
            />
          </div>
          <QuestionPageSidebar user={user} />
        </div>
      </div>
    </>
  );
}
