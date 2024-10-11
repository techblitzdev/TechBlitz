import { Question } from '@/types/Questions';
import { Button } from '@/components/ui/button';

export default function PreviousQuestionCard(opts: {
  questionData: Question;
  userUid: string;
}) {
  const { questionData, userUid } = opts;
  return (
    <Button
      key={questionData.uid}
      className="flex flex-col items-start bg-black-50 p-2 rounded-lg text-start h-auto"
    >
      <div>{questionData.question}</div>
      <div className="">{questionData.questionDate.toDateString()}</div>
    </Button>
  );
}
