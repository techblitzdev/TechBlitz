'use client';
import { Button } from '@/components/ui/button';
import { useQuestionSingle } from '@/components/app/questions/single/layout/question-single-context';

export default function QuestionActionButtons() {
  const { resetQuestionState, submitQuestionAnswer } = useQuestionSingle();

  return (
    <div className="flex gap-x-3 items-center">
      <Button variant="destructive" onClick={resetQuestionState}>
        Reset
      </Button>
      <form onSubmit={(e) => submitQuestionAnswer(e)}>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
