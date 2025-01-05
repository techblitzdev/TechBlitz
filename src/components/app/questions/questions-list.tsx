import GlobalPagination from '@/components/global/pagination';
import QuestionCard from '@/components/app/questions/question-card';

import { listQuestions } from '@/actions/questions/list';

import { FilterParams } from '@/utils/search-params';
import { Button } from '@/components/ui/button';
import type { UserRecord } from '@/types/User';

const ITEMS_PER_PAGE = 15;

export default async function QuestionsList({
  user,
  currentPage,
  filters,
  customQuestions = false,
  previousQuestions = false,
  showSubmissions = true,
}: {
  user: UserRecord | null;
  currentPage: number;
  filters: FilterParams;
  customQuestions: boolean;
  previousQuestions?: boolean;
  showSubmissions?: boolean;
}) {
  const data = await listQuestions({
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
    userUid: user?.uid || '',
    filters,
    customQuestions,
    previousQuestions,
  });

  // if we are on custom questions and the user is not a premium user, show a message
  if (customQuestions && user && user.userLevel === 'FREE') {
    return (
      <div className="flex flex-col gap-y-4 items-center justify-center mt-4">
        <p className="text-lg font-medium text-gray-400">
          Upgrade to Premium to access custom questions.
        </p>
        <div className="flex gap-x-2">
          <Button href="/questions">Back to all questions</Button>
          <Button href="/upgrade" variant="secondary">
            Upgrade
          </Button>
        </div>
      </div>
    );
  }

  if (!data.questions || data.questions.length === 0) {
    return (
      <div className="flex flex-col gap-y-4 items-center justify-center mt-4">
        <p className="text-lg font-medium text-gray-400">
          No questions match your filters.
        </p>
        <Button>Clear filters</Button>
      </div>
    );
  }

  return (
    <>
      {data.questions.map((q) => (
        <QuestionCard
          key={q.uid}
          questionData={q}
          showSubmissions={showSubmissions}
        />
      ))}
      <div className="mt-5 w-full flex justify-center gap-x-2">
        <GlobalPagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          href={customQuestions ? '/questions/custom' : '/questions'}
          paramName="page"
        />
      </div>
    </>
  );
}
