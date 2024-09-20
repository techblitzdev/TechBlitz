import { getQuestions } from '@/actions/questions/admin/get';
import Link from 'next/link';
import AdminQuestionPicker from '@/components/questions/admin/question-picker';
import AdminQuestionToday from './question-today';
import { getPagination } from '@/utils/supabase/pagination';

export default async function AdminQuestionList({ ...props }) {
  const { from, to } = getPagination(0, 10);
  const questions = await getQuestions({ from, to });

  return (
    <div {...props}>
      <AdminQuestionToday />
      <AdminQuestionPicker />
      {questions?.length === 0 && <p>No questions found</p>}
      <div className="flex flex-col gap-y-2 mt-5">
        {questions &&
          typeof questions !== 'string' &&
          questions.map((question) => (
            <Link
              key={question.uid}
              href={`/admin/questions/${question.uid}`}
              className="p-2 border border-black-50 bg-black-75 rounded-sm font-inter hover:bg-black-50 duration-300"
            >
              <p>
                <span className="font-semibold">Question:</span>{' '}
                {question.question}
              </p>
              <p>
                <span className="font-semibold">Question date:</span>{' '}
                {question.questionDate.toISOString()}
              </p>
              <div>
                <span className="font-semibold">Question answers:</span>{' '}
                {question.answers.map((a, index) => (
                  <p key={index}>
                    {index + 1}. {a.answer}
                  </p>
                ))}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
