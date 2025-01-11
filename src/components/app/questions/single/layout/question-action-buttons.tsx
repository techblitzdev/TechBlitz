'use client';
import { Button } from '@/components/ui/button';
import { useQuestionSingle } from '@/components/app/questions/single/layout/question-single-context';
import { RefreshCcwIcon } from 'lucide-react';

export default function QuestionActionButtons() {
  const {
    resetQuestionState,
    submitQuestionAnswer,
    isSubmitting,
    selectedAnswer,
    user,
    question,
  } = useQuestionSingle();

  return (
    <div className="flex gap-x-1 md:gap-x-3 items-center">
      <Button variant="destructive" onClick={resetQuestionState}>
        <span className="hidden md:block">Reset</span>
        <span className="block md:hidden">
          <RefreshCcwIcon className="w-4 h-4" />
        </span>
      </Button>
      {user ? (
        <form onSubmit={(e) => submitQuestionAnswer(e)}>
          <Button type="submit" disabled={isSubmitting || !selectedAnswer}>
            Submit
          </Button>
        </form>
      ) : (
        <Button
          variant="accent"
          href={`/login?redirectUrl=question/${question.uid}`}
        >
          Login to Submit
        </Button>
      )}
    </div>
  );
}
