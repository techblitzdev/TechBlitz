import Filter from '@/components/global/filters/filter';
import FilterChips from '@/components/global/filters/chips';

import QuestionsList from '@/components/app/questions/layout/questions-list';

import QuestionPageSidebar from '@/components/app/questions/layout/question-page-sidebar';

import Hero from '@/components/global/hero';

import { useUserServer } from '@/hooks/use-user-server';
import { validateSearchParams } from '@/utils/search-params';
import { parseSearchParams } from '@/utils/search-params';
import { getTags } from '@/utils/data/questions/tags/get-tags';
import { createMetadata } from '@/utils';

export async function generateMetadata() {
  return createMetadata({
    title: 'Previous Daily Questions | TechBlitz',
    description: 'All daily questions that have been asked in the past.',
    image: {
      text: 'Previous Daily Questions | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/questions/previous',
  });
}

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
          <div className="w-full lg:min-w-[65%] space-y-6">
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
              paginationUrl="/questions"
            />
          </div>
          <QuestionPageSidebar user={user} />
        </div>
      </div>
    </>
  );
}
