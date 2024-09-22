import { getQuestion } from '@/actions/questions/get';

export default async function TodaysQuestionPage({
  params,
}: {
  params: {
    uid: string;
  };
}) {
  const { uid } = params;

  const question = await getQuestion(uid);

  if (!question) return <p>Loading...</p>;

  return (
    <div className="font-inter flex flex-col gap-y-4">
      {question.correctAnswer && (
        <p>Correct answer: {question.correctAnswer}</p>
      )}
    </div>
  );
}
