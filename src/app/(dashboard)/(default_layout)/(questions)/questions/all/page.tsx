import { Suspense } from 'react';

import GlobalPagination from '@/components/global/pagination';
import QuestionCard from '@/components/questions/question-card';
import Filter from '@/components/global/filters/filter';
import FilterChips from '@/components/global/filters/chips';
import Hero from '@/components/global/hero';
import QuestionCardLoading from '@/components/questions/question-card-loading';
import QuestionPageSidebar from '@/components/questions/question-page-sidebar';

import { listQuestions } from '@/actions/questions/list';

import { useUserServer } from '@/hooks/useUserServer';
import { QuestionDifficulty } from '@/types/Questions';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 20;

export default async function QuestionsDashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();
  if (!user) return null;

  const currentPage = parseInt(searchParams.page as string) || 1;
  const ascending = searchParams.ascending === 'true';
  const difficulty = searchParams.difficulty as QuestionDifficulty;
  const completed =
    'completed' in searchParams ? searchParams.completed === 'true' : undefined;
  const tags = (searchParams.tags as string)?.split(',') || [];

  if (currentPage < 1) return null;

  const filters = {
    ascending,
    difficulty,
    completed,
    tags,
  };

  return (
    <>
      <Hero
        heading="All Questions"
        subheading="Explore a diverse set of questions across multiple topics to enhance your knowledge."
      />
      <div className="md:container flex flex-col lg:flex-row mt-5 gap-10">
        <div className="w-full lg:w-1/2 space-y-6">
          <Filter />
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
              userUid={user.uid}
              currentPage={currentPage}
              filters={filters}
            />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          {user && <QuestionPageSidebar user={user} />}
        </Suspense>
      </div>
    </>
  );
}

async function QuestionsList({
  userUid,
  currentPage,
  filters,
}: {
  userUid: string;
  currentPage: number;
  filters: {
    ascending: boolean;
    difficulty: QuestionDifficulty;
    completed: boolean | undefined;
    tags: string[];
  };
}) {
  const data = await listQuestions({
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
    userUid,
    filters,
  });

  return (
    <>
      {data.questions.map((q) => (
        <QuestionCard key={q.uid} questionData={q} userUid={userUid} />
      ))}
      <div className="mt-5 w-full flex justify-center gap-x-2">
        <GlobalPagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          href="/questions/all"
          paramName="page"
        />
      </div>
    </>
  );
}
