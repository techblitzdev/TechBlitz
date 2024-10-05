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
import type { User } from '@supabase/supabase-js';
import type { Answer } from '@/types/Answers';

type AnswerQuestionModalProps = {
  question: Question;
  user: User;
  correct: 'correct' | 'incorrect' | 'init';
  userAnswer: Answer;
};

export default function AnswerQuestionModal({
  question,
  user,
  correct,
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
        <DialogHeader className="w-full flex justify-center sm:text-center">
          <DialogTitle className="text-2xl">That was {correct}</DialogTitle>
        </DialogHeader>

        <DialogDescription></DialogDescription>

        <DialogFooter className="flex justify-between gap-3">
          <Button>View Answer</Button>
          <Button variant="secondary">Next Question</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
