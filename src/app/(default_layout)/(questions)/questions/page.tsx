import { listQuestions } from '@/actions/questions/list';
import { getPagination } from '@/utils/supabase/pagination';
import QuestionsDashboardClient from './page.client';

export default async function QuestionsDashboard() {
  const { from, to } = getPagination(1, 3);
  const { questions, total, totalPages, page } = await listQuestions({
    page: from,
    pageSize: to,
  });

  return (
    <div className="bg-black-75 rounded-xl p-4 space-y-4">
      <QuestionsDashboardClient
        questions={questions}
        page={0}
        totalPages={totalPages}
        total={total}
      />
    </div>
  );
}
