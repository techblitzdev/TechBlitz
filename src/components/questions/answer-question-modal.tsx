import { useCallback } from 'react';

import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

import type { Question } from '@/types/Questions';
import type { UserRecord } from '@/types/User';
import type { Answer } from '@/types/Answers';
import LoadingSpinner from '../ui/loading';

type AnswerQuestionModalProps = {
  question: Question;
  user: UserRecord;
  correct: 'correct' | 'incorrect' | 'init';
  userAnswer: Answer;
};

export default function AnswerQuestionModal({
  question,
  user,
  correct,
  userAnswer,
}: AnswerQuestionModalProps) {
  const buttonText = useCallback(() => {
    if (correct === 'init') {
      return 'Submit';
    }
    return correct === 'correct' ? 'Correct!' : 'Incorrect!';
  }, [correct]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button type="submit" variant="default">
          {buttonText()}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black-75 md:max-w-xl">
        {correct === 'init' ? (
          <div className="h-36 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <DialogHeader className="w-full flex justify-center sm:text-center">
              <DialogTitle className="text-2xl">
                That was {correct}!
              </DialogTitle>
            </DialogHeader>

            <DialogDescription>{JSON.stringify(user)}</DialogDescription>
          </>
        )}
        <DialogFooter className="flex justify-between gap-3">
          {correct === 'incorrect' ? (
            <Button>Retry question</Button>
          ) : (
            <Button>View question</Button>
          )}
          <Button variant="secondary">Next question</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
