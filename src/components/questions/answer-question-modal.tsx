import { useCallback, useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Question } from '@/types/Questions';
import type { UserRecord } from '@/types/User';
import type { Answer } from '@/types/Answers';
import LoadingSpinner from '@/components/ui/loading';
import { DailyStreakChart } from '@/components/dashboard/daily-streak-chart';

type AnswerQuestionModalProps = {
  question: Question;
  user: UserRecord;
  correct: 'correct' | 'incorrect' | 'init';
  userAnswer: Answer;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRetry?: () => void;
  onNext?: () => void;
};

type DialogContentType = {
  correct: (name: string) => {
    heading: string;
    description: string;
  };
  incorrect: {
    heading: string;
    description: string;
  };
};

const dialogContent: DialogContentType = {
  correct: (name: string) => ({
    heading: `Well done ${name || 'there'}!`,
    description: 'You got the answer right!',
  }),
  incorrect: {
    heading: 'Better luck next time!',
    description: 'You got the answer wrong, want to try again?',
  },
};

export default function AnswerQuestionModal({
  question,
  user,
  correct,
  userAnswer,
  isOpen,
  onOpenChange,
  onRetry,
  onNext,
}: AnswerQuestionModalProps) {
  const [showQuestionData, setShowQuestionData] = useState(false);

  const getDialogContent = useCallback(() => {
    if (correct === 'init') {
      return null;
    }
    return correct === 'correct'
      ? dialogContent.correct(user?.name || '')
      : dialogContent.incorrect;
  }, [correct, user?.name]);

  const content = getDialogContent();

  const userStreakData = {
    totalDailyStreak: user.totalDailyStreak,
    correctDailyStreak: user.correctDailyStreak,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-black-75 md:max-w-xl"
        aria-description="Answer question modal"
      >
        {correct === 'init' ? (
          <div className="h-36 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="w-full flex flex-col items-center sm:text-center">
              <DialogTitle className="text-2xl">{content?.heading}</DialogTitle>
              <DialogDescription className="mt-2">
                {content?.description}
              </DialogDescription>
            </div>

            <DailyStreakChart userStreakData={userStreakData} />

            {showQuestionData && (
              <div className="mt-4">
                <pre className="bg-black-100 p-4 rounded-md overflow-x-auto">
                  {JSON.stringify(userAnswer, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
        <DialogFooter className="flex w-full justify-between gap-3 mt-6">
          {user.userLevel === 'ADMIN' && (
            <Button
              variant="secondary"
              onClick={() => setShowQuestionData(!showQuestionData)}
            >
              {showQuestionData ? 'Hide' : 'Show'} question data
            </Button>
          )}
          <div className="flex gap-3">
            {correct === 'incorrect' ? (
              <Button variant="default" onClick={onRetry}>
                Retry question
              </Button>
            ) : (
              <Button variant="default" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            )}
            <Button variant="secondary" onClick={onNext}>
              Next question
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
