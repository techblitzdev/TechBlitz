import GlobalPagination from '@/components/global/pagination';
import QuestionCard from '@/components/questions/question-card';
import QuestionCardLoading from '@/components/questions/question-card-loading';
import PreviousQuestionPageSidebar from '@/components/questions/previous/previous-question-page-sidebar';
import Hero from '@/components/global/hero';

import { getPreviousQuestions } from '@/actions/questions/get-previous';
import { useUserServer } from '@/hooks/useUserServer';
import { Suspense } from 'react';

const ITEMS_PER_PAGE = 10;

export default async function PreviousQuestionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();
  if (!user) return null;

  const currentPage = parseInt(searchParams.page as string) || 1;

  const data = await getPreviousQuestions({
    user,
    orderBy: 'asc',
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
  });

  return (
    <>
      <Hero
        heading="Previous Daily Questions"
        subheading="Questions you have answered in the past"
      />
      <div className="flex flex-col h-full justify-between container mt-5">
        <div className="flex w-full gap-10">
          <div className="w-1/2 space-y-6">
            <Suspense
              fallback={
                <>
                  {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                    <QuestionCardLoading key={i} />
                  ))}
                </>
              }
            >
              {data?.questions.map((q) => (
                <QuestionCard
                  key={q.uid}
                  questionData={q}
                  userUid={user?.uid || ''}
                />
              ))}
            </Suspense>
            <GlobalPagination
              currentPage={currentPage}
              totalPages={data?.totalPages || 1}
              href="/previous-questions"
              paramName="page"
            />
          </div>
          {/* Display sidebar with user statistics and suggested questions */}
          <Suspense fallback={null}>
            {user && <PreviousQuestionPageSidebar user={user} />}
          </Suspense>
        </div>
      </div>
    </>
  );
}
