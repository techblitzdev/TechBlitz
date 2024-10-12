import { Question } from '@/types/Questions';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Answer } from '@/types/Answers';
import PreviousQuestionAnswerModal from '../answers/previous-question-answer-modal';

export default function PreviousQuestionCard(opts: {
  questionData: Question;
  userUid: string;
  userAnswer: Answer | undefined;
}) {
  const { questionData, userUid, userAnswer } = opts;
  // state to track whether to open the user's answer to the question
  const [showAnswerModal, setShowAnswerModal] = useState<Answer | undefined>(
    undefined
  );

  return (
    <>
      <Button
        key={questionData.uid}
        className="flex flex-col items-start bg-black-50 p-2 rounded-lg text-start h-auto"
        onClick={() => setShowAnswerModal(userAnswer || undefined)}
      >
        <div className="flex items-center gap-x-10">
          <p>{questionData.question}</p>
          <p>{questionData.questionDate.toDateString()}</p>
        </div>
        {!userAnswer && <div className="text-sm">No answer submitted</div>}
        {userAnswer && (
          <div className="text-sm">
            {userAnswer?.correctAnswer ? '✅' : '❌'}
          </div>
        )}
      </Button>
      <PreviousQuestionAnswerModal
        isOpen={showAnswerModal !== undefined}
        onClose={() => setShowAnswerModal(undefined)}
        userAnswer={showAnswerModal}
        questionData={questionData}
      />
    </>
  );
}
