import { getQuestions } from '@/actions/questions/admin/get';

export default async function AdminQuestionList({ ...props }) {
  const questions = await getQuestions();
  return (
    <div {...props}>
      {questions?.length === 0 && <p>No questions found</p>}
      <div className="flex flex-col gap-y-2">
        {questions &&
          typeof questions !== 'string' &&
          questions.map((question) => (
            <div
              key={question.uid}
              className="p-2 border border-white rounded-sm"
            >
              <p>{question.question}</p>
              <p>Question date: {question.questionDate.toISOString()}</p>
              <div>
                Question answers:{' '}
                {question.answers.map((a, index) => (
                  <p key={index}>
                    {index + 1}. {a.answer}
                  </p>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
