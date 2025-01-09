import Filter from '@/components/global/filters/filter';
import FilterChips from '@/components/global/filters/chips';

import QuestionPageSidebar from '@/components/app/questions/layout/question-page-sidebar';

import Hero from '@/components/global/hero';

import { useUserServer } from '@/hooks/use-user-server';
import { validateSearchParams } from '@/utils/search-params';
import { parseSearchParams } from '@/utils/search-params';
import { getTags } from '@/utils/data/questions/tags/get-tags';
import QuestionsCarouselList from '@/components/app/questions/layout/carousel/question-carousel-list';

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
        heading="Explore Questions"
        subheading="Curated lists of hot topics to help you learn."
        container={false}
      />
      <div className="flex flex-col lg:flex-row mt-5 gap-16">
        <div className="w-full lg:min-w-[75%] space-y-6">
          <div className="min-h-[84px] flex flex-col gap-y-2">
            <Filter tags={tags} />
            <FilterChips />
          </div>
          <QuestionsCarouselList />
        </div>
        <QuestionPageSidebar user={user} />
      </div>
    </>
  );
}
