import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import CodeDisplay from '../../questions/single/layout/code-snippet';
import { useRoadmapOnboardingContext } from './roadmap-onboarding-context';

interface AnswerOptionProps {
  answer: {
    uid: string;
    answer: string;
  };
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

export default function AnswerOption({ answer, field }: AnswerOptionProps) {
  const { setUserAnswer, userAnswer } = useRoadmapOnboardingContext();

  const isCode = /<pre><code/.test(answer.answer);

  return (
    <Label
      htmlFor={answer.uid}
      className={cn(
        'px-2 lg:px-4 lg:py-2 rounded-lg min-h-16 w-full h-full flex items-center gap-x-2 cursor-pointer transition-colors border border-black-50',
        userAnswer === answer.uid ? 'bg-black-25' : 'bg-black hover:border-accent'
      )}
      onClick={() => {
        field.onChange(answer.uid);
        setUserAnswer(answer.uid);
      }}
    >
      <input
        type="radio"
        id={answer.uid}
        className="hidden"
        name="answer"
        value={answer.uid}
        checked={userAnswer === answer.uid}
        onChange={() => {
          setUserAnswer(answer.uid);
        }}
      />
      {isCode ? (
        <CodeDisplay
          content={answer.answer}
          language="javascript"
          hideIndex
          backgroundColor="transparent"
        />
      ) : (
        <p className="text-sm" dangerouslySetInnerHTML={{ __html: answer.answer }} />
      )}
    </Label>
  );
}
