import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';

import type { Question } from '@/types/Questions';
import { DialogTrigger } from '@radix-ui/react-dialog';
import type { User } from '@supabase/supabase-js';
import { Button } from '../ui/button';
import { useCallback } from 'react';

type AnswerQuestionModalProps = {
  isOpen: boolean;
  question: Question;
  user: User;
  correct: 'correct' | 'incorrect' | 'init';
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
      <DialogContent className="bg-black-75 md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>That was {correct}</DialogTitle>
        </DialogHeader>

        <DialogDescription>{JSON.stringify(question)}</DialogDescription>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
