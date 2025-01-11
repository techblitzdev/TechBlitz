import Filter from '@/components/global/filters/filter';
import FilterChips from '@/components/global/filters/chips';

import QuestionsList from '@/components/app/questions/layout/questions-list';

import QuestionPageSidebar from '@/components/app/questions/layout/question-page-sidebar';

import Hero from '@/components/global/hero';

import { useUserServer } from '@/hooks/use-user-server';
import { validateSearchParams } from '@/utils/search-params';
import { parseSearchParams } from '@/utils/search-params';
import { getTags } from '@/utils/data/questions/tags/get-tags';
import { createMetadata } from '@/utils/seo';
import { Button } from '@/components/ui/button';

export async function generateMetadata() {
  return createMetadata({
    title: 'All Questions | TechBlitz',
    description:
      'Explore a diverse set of questions across multiple topics to enhance your knowledge.',
    image: {
      text: 'All Questions | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/questions',
  });
}

const heroDescription = (
  <div className="flex flex-col gap-y-4 z-20 relative font-inter max-w-3xl">
    <p className="text-sm md:text-base text-gray-400">
      Explore all the questions we have to offer. Filter by tags, difficulty,
      and more.
    </p>
    <p className="text-gray-400">Want a more curated set of questions?</p>
    <div className="flex flex-col md:flex-row gap-2 md:items-center">
      <Button href="/questions/previous" variant="default">
        View previous daily questions
      </Button>
      <Button href="/questions/explore" variant="secondary">
        Explore curated questions
      </Button>
    </div>
  </div>
);

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
      <Hero heading="All Questions" subheading={heroDescription} />
      <div className="w-full md:container flex flex-col xl:flex-row mt-5 gap-16">
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
