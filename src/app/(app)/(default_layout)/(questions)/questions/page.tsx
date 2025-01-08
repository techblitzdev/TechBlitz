import Filter from '@/components/global/filters/filter';
import FilterChips from '@/components/global/filters/chips';

import QuestionsList from '@/components/app/questions/questions-list';

import QuestionPageSidebar from '@/components/app/questions/question-page-sidebar';

import Hero from '@/components/global/hero';

import { useUserServer } from '@/hooks/use-user-server';
import { validateSearchParams } from '@/utils/search-params';
import { parseSearchParams } from '@/utils/search-params';
import { getTags } from '@/utils/data/questions/tags/get-tags';

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
            paginationUrl="/questions"
          />
        </div>
        <QuestionPageSidebar user={user} />
      </div>
    </>
  );
}
