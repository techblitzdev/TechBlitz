import { getQuestions } from '@/actions/questions/admin/get';

export default async function AdminQuestionList({ ...props }) {
  const questions = await getQuestions();
  return (
    <div {...props}>
      {questions?.length === 0 && <p>No questions found</p>}
      {questions &&
        typeof questions !== 'string' &&
        questions.map((question) => (
          <div key={question.uid} className="flex flex-col gap-y-2">
            <p>{question.question}</p>
          </div>
        ))}
    </div>
  );
}
