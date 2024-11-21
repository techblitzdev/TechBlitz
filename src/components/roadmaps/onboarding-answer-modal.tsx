import { useCallback, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { UserRecord } from '@/types/User';
import type { Answer } from '@/types/Answers';
import LoadingSpinner from '@/components/ui/loading';
import { LockClosedIcon } from '@radix-ui/react-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';

type AnswerQuestionModalProps = {
  user: UserRecord;
  correct: 'correct' | 'incorrect' | 'init';
  userAnswer: Answer;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRetry?: () => void;
  onNext?: () => void;
  nextQuestion?: string;
};

export default function OnboardingAnswerQuestionModal({
  user,
  correct,
  userAnswer,
  isOpen,
  onOpenChange,
  onRetry,
  onNext,
  nextQuestion,
}: AnswerQuestionModalProps) {
  const router = useRouter();
  const [showQuestionData, setShowQuestionData] = useState(false);

  const handleNextQuestion = () => {
    if (user.userLevel === 'FREE' && correct === 'correct') {
      return;
    }

    if (nextQuestion) {
      router.push(`/question/${nextQuestion}`);
    }
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
              <DialogTitle className="text-2xl">Heading</DialogTitle>
            </div>
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
          <div className="flex gap-3 w-full justify-end">
            {correct === 'incorrect' ? (
              <Button variant="default" onClick={onRetry} className="!w-fit">
                Retry question
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => router.push('/dashboard')}
                fullWidth={false}
              >
                Dashboard
              </Button>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="secondary"
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1"
                    fullWidth={false}
                    disabled={user?.userLevel === 'FREE'}
                  >
                    Next question
                    {user?.userLevel === 'FREE' && <LockClosedIcon />}
                  </Button>
                  {user?.userLevel === 'FREE' && (
                    <TooltipContent>
                      <p>Upgrade to premium to unlock the next question</p>
                    </TooltipContent>
                  )}
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
