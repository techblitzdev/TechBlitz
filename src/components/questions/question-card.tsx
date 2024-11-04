import { QuestionAnswer } from '@/types/QuestionAnswers';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/cn';

export default function QuestionCard(opts: {
  answer: QuestionAnswer;
  field: any;
  onAnswerSelect?: (value: string | null) => void;
}) {
  const { answer, field, onAnswerSelect } = opts;

  const active = field.value === answer.uid;

  const handleClick = () => {
    const newValue = field.value === answer.uid ? null : answer.uid;
    field.onChange({
      target: {
        value: newValue,
        type: 'checkbox',
      },
      preventDefault: () => {},
    });
    onAnswerSelect?.(newValue);
  };

  return (
    <Label
      htmlFor={answer.uid}
      className={cn(
        'p-2 rounded-xl h-20 col-span-full lg:col-span-6 flex items-center gap-x-2 cursor-pointer transition-colors',
        active ? 'bg-primary hover:bg-primary/90' : 'bg-black hover:bg-gray-900'
      )}
      onClick={handleClick}
    >
      <input
        type="radio"
        id={answer.uid}
        name="answer"
        className="hidden"
        checked={active}
        onChange={() => {}}
      />
      <p className="text-xl">{answer.answer}</p>
    </Label>
  );
}
