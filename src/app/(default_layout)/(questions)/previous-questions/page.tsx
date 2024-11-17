import GlobalPagination from '@/components/global/pagination';
import PreviousQuestionCard from '@/components/questions/previous/previous-question-card';
import { Separator } from '@/components/ui/separator';
import { getPreviousQuestions } from '@/actions/questions/get-previous';
import BackToDashboard from '@/components/global/back-to-dashboard';
import PreviousQuestionPageSidenbar from '@/components/questions/previous/previous-question-page-sidebar';
import { useUserServer } from '@/hooks/useUserServer';

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
    userUid: user.uid,
    orderBy: 'asc',
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
  });

  return (
    <>
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex flex-col gap-y-2 justify-center w-full text-center">
          <div className="flex items-center w-full justify-between container">
            <BackToDashboard />
            <div className="flex flex-col w-full justify-between">
              <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
                Previous Daily Questions
              </h1>
              <p className="font-ubuntu text-sm text-gray-300">
                Here you can find all the daily questions that have been asked
                in the past.
              </p>
            </div>
            <div aria-hidden></div>
          </div>
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="flex flex-col h-full justify-between container mt-5">
        <div className="flex w-full gap-10">
          <div className="w-1/2 space-y-6">
            {data?.questions.map((q) => (
              <PreviousQuestionCard
                key={q.uid}
                questionData={q}
                userUid={user?.uid || ''}
                userAnswer={data.answers.find((a) => a.questionUid === q.uid)}
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
    </>
  );
}
