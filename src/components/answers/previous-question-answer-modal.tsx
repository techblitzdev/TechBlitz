'use client';
// components
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import JsonDisplay from '@/components/global/json-display';
// types
import { Answer } from '@/types/Answers';
import { Question } from '@/types/Questions';
import { useQuery } from '@tanstack/react-query';
import { getAnswer } from '@/actions/answers/get-answer';

export default function PreviousQuestionAnswerModal(opts: {
  isOpen: boolean;
  onClose: () => void;
  userAnswer: Answer | undefined;
  questionData: Question;
}) {
  const { onClose, isOpen, userAnswer, questionData } = opts;

  // get the answer to the question
  const { data, isError, isLoading } = useQuery({
    queryKey: ['getAnswer', { questionUid: questionData.uid }],
    queryFn: async () => {
      return await getAnswer({
        questionUid: questionData.uid,
        userUid: userAnswer?.userUid || '',
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-black-75 md:max-w-xl"
        aria-description={`Answer question modal`}
      >
        <DialogTitle>Answer</DialogTitle>
        <DialogDescription>
          <p>{JSON.stringify(data, null, 2)}</p>
          <JsonDisplay data={userAnswer} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
