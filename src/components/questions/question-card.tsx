import { QuestionAnswer } from '@/types/QuestionAnswers';

export default function QuestionCard(opts: {
  answer: QuestionAnswer;
  field: any;
}) {
  const { answer, field } = opts;

  return (
    <div className="">
      <label className="flex items-center gap-x-2">
        <input
          {...field}
          type="radio"
          name="answer"
          value={answer.uid}
          checked={field.value === answer.uid}
          onChange={() => field.onChange(answer.uid)}
        />
        <span>{answer.answer}</span>
      </label>
    </div>
  );
}
