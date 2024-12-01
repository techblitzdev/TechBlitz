import GlobalPagination from '@/components/global/pagination';
import QuestionCard from '@/components/questions/question-card';
import { getPreviousQuestions } from '@/actions/questions/get-previous';
import PreviousQuestionPageSidenbar from '@/components/questions/previous/previous-question-page-sidebar';
import { useUserServer } from '@/hooks/useUserServer';
import Hero from '@/components/global/hero';

const ITEMS_PER_PAGE = 10;

export default async function PreviousQuestionsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();
  if (!user) return null;

  const currentPage = parseInt(searchParams.page as string) || 1;

  const data = await getPreviousQuestions({
    userUid: user.uid,
    orderBy: 'asc',
    page: currentPage,
    pageSize: ITEMS_PER_PAGE
  });

  return (
    <div>
      <Hero
        heading="Previous Daily Questions"
        subheading="Questions you have answered in the past"
      />
      <div className="flex flex-col h-full justify-between container mt-5">
        <div className="flex w-full gap-10">
          <div className="w-1/2 space-y-6">
            {data?.questions.map((q) => (
              <QuestionCard
                key={q.uid}
                questionData={q}
                userUid={user?.uid || ''}
              />
            ))}
            <GlobalPagination
              currentPage={currentPage}
              totalPages={data?.totalPages || 1}
              href="/previous-questions"
              paramName="page"
            />
          </div>
          {/* Display sidebar with user statistics and suggested questions */}
          {user && <PreviousQuestionPageSidenbar user={user} />}
        </div>
      </div>
    </div>
  );
}
