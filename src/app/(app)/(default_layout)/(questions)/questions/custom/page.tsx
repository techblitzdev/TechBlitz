import { Suspense } from 'react';

// Components
import FilterChips from '@/components/global/filters/chips';
import Hero from '@/components/global/hero';
import QuestionPageSidebarLoading from '@/components/app/questions/question-page-sidebar-loading';
import QuestionPageSidebar from '@/components/app/questions/question-page-sidebar';
import QuestionsList from '@/components/app/questions/questions-list';
import QuestionCardLoading from '@/components/app/questions/question-card-loading';
import Filter from '@/components/global/filters/filter';

// Hooks
import { useUserServer } from '@/hooks/use-user-server';

// Utils
import { parseSearchParams, validateSearchParams } from '@/utils/search-params';
import { getTags } from '@/actions/questions/tags/get-tags';

export default async function CustomQuestionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // we need an authed user to view this page
  const user = await useUserServer();
  if (!user) return null;

  const tags = await getTags();

  const filters = parseSearchParams(searchParams);
  if (!validateSearchParams(filters)) return null;

  return (
    <>
      <Hero
        heading="Custom Questions"
        subheading="Questions created just for you."
      />
      <div className="md:container flex flex-col lg:flex-row mt-5 gap-16">
        <div className="w-full lg:min-w-[55%] space-y-6">
          <Filter tags={tags} showSort={false} />
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
              user={user}
              currentPage={filters.page}
              filters={filters}
              customQuestions={true}
              showSubmissions={false}
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
