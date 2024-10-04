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
import type { User } from '@supabase/supabase-js';

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
  return (
    <DialogContent className="bg-black-75 md:max-w-3xl">
      <DialogHeader>
        <DialogTitle>That was {correct}</DialogTitle>
      </DialogHeader>

      <DialogDescription>{JSON.stringify(question)}</DialogDescription>

      <DialogFooter></DialogFooter>
    </DialogContent>
  );
}
