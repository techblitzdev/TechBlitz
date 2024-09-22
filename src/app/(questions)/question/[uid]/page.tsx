import { getQuestion } from '@/actions/questions/get';
import { Button } from '@/components/ui/button';

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
    <form className="font-inter flex flex-col gap-y-4">
      {/** Question title */}
      <h1 className="font-semibold font-inter text-3xl">
        {question?.question}
      </h1>
      {/** Checkbox of answers */}
      <div className="flex flex-col gap-y-2">
        {question?.answers.map((answer) => (
          <div key={answer.uid} className="flex items-center gap-x-2">
            <input type="checkbox" />
            <span>{answer.answer}</span>
          </div>
        ))}
      </div>
      {/** Submit button */}
      <Button variant="default" type="submit">
        Submit
      </Button>
    </form>
  );
}
