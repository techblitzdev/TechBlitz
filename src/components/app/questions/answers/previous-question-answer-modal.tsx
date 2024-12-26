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
import LoadingSpinner from '@/components/ui/loading';

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
        aria-label={`Answer question modal`}
      >
        <DialogTitle>Answer</DialogTitle>
        <DialogDescription className="flex flex-col gap-y-1">
          {isLoading && <LoadingSpinner />}
          {isError && <p>Error getting answer</p>}
          {/* <JsonDisplay data={data} /> */}
          <p>
            <span className="font-semibold">Question: </span>
            {questionData.question}
          </p>
          <p>
            {userAnswer?.correctAnswer ? '✅' : '❌'}{' '}
            <span className="font-semibold">
              {userAnswer?.correctAnswer ? 'Correct' : 'Incorrect'}
            </span>
          </p>
          {/** if the answer is incorrect, display the correct answer */}
          {!userAnswer?.correctAnswer && (
            <>
              <p>
                <span className="font-semibold">Your Answer: </span>
                <JsonDisplay data={userAnswer} />
              </p>
              <p>
                <span className="font-semibold">Correct Answer: </span>
                {data?.answer}
              </p>
            </>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
