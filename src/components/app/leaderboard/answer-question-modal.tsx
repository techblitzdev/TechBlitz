'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import LoadingSpinner from '@/components/ui/loading';
import type { QuestionWithTags } from '@/types';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import Lock from '@/components/ui/icons/lock';

interface AnswerQuestionModalProps {
  recommendedQuestion: QuestionWithTags | null;
}

export default function AnswerQuestionModal({ recommendedQuestion }: AnswerQuestionModalProps) {
  const [isPending, startTransition] = useTransition();
  const [isAnswerRedirect, startAnswerRedirect] = useTransition();

  const router = useRouter();
  const redirectToDashboard = () => {
    router.push('/dashboard');
  };

  const handleAnswerQuestion = () => {
    // redirect to the question
    router.push(`/question/${recommendedQuestion?.slug || recommendedQuestion?.uid}`);
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="bg-black-75 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-end gap-x-2">
            <Lock height="40" width="40" />
            <h6 className="text-2xl font-bold">Oh no! You haven't answered 3 questions yet...</h6>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          In order to compete on the leaderboard, you need to answer 3 questions.
          <br />
          Start by answering your next recommended question!
        </DialogDescription>
        <DialogFooter className="flex justify-end">
          <Button variant="default" onClick={() => startTransition(redirectToDashboard)}>
            {isPending ? <LoadingSpinner /> : 'Cancel'}
          </Button>
          <Button variant="accent" onClick={() => startAnswerRedirect(handleAnswerQuestion)}>
            {isAnswerRedirect ? <LoadingSpinner /> : 'Answer question'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
