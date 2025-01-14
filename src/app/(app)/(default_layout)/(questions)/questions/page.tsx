import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import Hero from '@/components/global/hero';
import { Button } from '@/components/ui/button';

import { useUserServer } from '@/hooks/use-user-server';
import { validateSearchParams, parseSearchParams } from '@/utils/search-params';
import { getTags } from '@/utils/data/questions/tags/get-tags';
import { createMetadata } from '@/utils/seo';

const Filter = dynamic(() => import('@/components/global/filters/filter'), {
  ssr: false,
});
const FilterChips = dynamic(() => import('@/components/global/filters/chips'), {
  ssr: false,
});
const QuestionsList = dynamic(
  () => import('@/components/app/questions/layout/questions-list')
);
const QuestionPageSidebar = dynamic(
  () => import('@/components/app/questions/layout/question-page-sidebar')
);
const QuestionCardSkeleton = dynamic(() =>
  import('@/components/app/questions/layout/question-card').then(
    (mod) => mod.QuestionCardSkeleton
  )
);

import FilterLoading from '@/components/global/filters/filters-loading';
import QuestionPageSidebarLoading from '@/components/app/questions/layout/question-page-sidebar-loading';

export const revalidate = 600;

export async function generateMetadata() {
  return createMetadata({
    title: 'Coding Questions | TechBlitz',
    description:
      'Explore a diverse set of coding questions across multiple topics to enhance your knowledge.',
    image: {
      text: 'Coding Questions | TechBlitz',
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
    <p className="text-gray-400">Want a more guided set of questions?</p>
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
  const [user, tags] = await Promise.all([useUserServer(), getTags()]);

  const filters = parseSearchParams(searchParams);
  if (!validateSearchParams(filters)) return null;

  return (
    <div>
      <Hero heading="Coding Questions" subheading={heroDescription} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="w-full lg:min-w-[55%] space-y-6">
            <div className="min-h-[84px] flex flex-col gap-y-2">
              <Suspense fallback={<FilterLoading />}>
                <Filter tags={tags} />
                <FilterChips />
              </Suspense>
            </div>

            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <QuestionCardSkeleton key={index} />
                  ))}
                </div>
              }
            >
              <QuestionsList
                user={user}
                currentPage={filters.page}
                filters={filters}
                customQuestions={false}
                paginationUrl="/questions"
              />
            </Suspense>
          </div>
          <div className="w-full xl:w-1/4">
            <Suspense fallback={<QuestionPageSidebarLoading />}>
              <QuestionPageSidebar user={user} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
