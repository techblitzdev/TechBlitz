import { listQuestions } from '@/actions/questions/list';
import { getPagination } from '@/utils/supabase/pagination';
import QuestionsDashboardClient from './page.client';
import QuestionListCard from '@/components/questions/list/question-card';
import { useUserServer } from '@/hooks/useUserServer';

const ITEMS_PER_PAGE = 5;

export default async function QuestionsDashboard() {
  const user = await useUserServer();
  if (!user) return null;

  // Fetch the first page of questions server-side
  const { from, to } = getPagination(1, ITEMS_PER_PAGE);
  const { questions, total, totalPages } = await listQuestions({
    page: 1,
    pageSize: ITEMS_PER_PAGE,
  });

  return (
    <div className="container flex mt-5 gap-10">
      <div className="w-1/2 space-y-6">
        {/* Render questions fetched server-side */}
        {questions?.map((question) => (
          <QuestionListCard
            key={question.uid}
            question={question}
            user={user}
          />
        ))}

        {/* Pass data to the client component for interactivity */}
        <QuestionsDashboardClient
          initialQuestions={questions}
          initialPage={1}
          totalPages={totalPages}
          total={total}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>

      <aside className="w-1/2 relative">
        <div className="sticky top-10 space-y-10 w-1/2">
          sidebar content goes here
        </div>
      </aside>
    </div>
  );
}
