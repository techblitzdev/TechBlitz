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

export default async function QuestionsDashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Fetch data in parallel using Promise.all
  const [user, tags] = await Promise.all([useUserServer(), getTags()]);

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
          <div className="min-h-[84px] flex flex-col gap-y-2">
            <Filter tags={tags} />
            <FilterChips />
          </div>
          <QuestionsList
            user={user}
            currentPage={filters.page}
            filters={filters}
            customQuestions={false}
          />
        </div>
        <QuestionPageSidebar user={user} />
      </div>
    </>
  );
}
