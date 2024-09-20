import { getQuestions } from '@/actions/questions/admin/get';
import AdminQuestionPicker from '@/components/questions/admin/question-picker';
import AdminQuestionToday from './question-today';
import { getPagination } from '@/utils/supabase/pagination';
import AdminQuestionCard from './question-card';

export default async function AdminQuestionList({ ...props }) {
  const { from, to } = getPagination(0, 10);
  const questions = await getQuestions({ from, to });

  if (!questions) return <p>Loading...</p>;

  return (
    <div {...props}>
      {questions?.today && <AdminQuestionToday question={questions.today[0]} />}
      <AdminQuestionPicker />
      {questions &&
        typeof questions !== 'string' &&
        Object.values(questions).every((arr) => arr.length === 0) && (
          <p>No questions found</p>
        )}
      <div className="flex flex-col gap-y-2 mt-5">
        {/* Render future questions */}
        {questions.future?.map((question) => (
          <AdminQuestionCard key={question.uid} question={question} />
        ))}

        {/* Render past questions */}
        {questions.past?.map((question) => (
          <AdminQuestionCard key={question.uid} question={question} />
        ))}
      </div>
    </div>
  );
}
