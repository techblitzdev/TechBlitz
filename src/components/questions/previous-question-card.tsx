import { Question } from '@/types/Questions';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Answer } from '@/types/Answers';

export default function PreviousQuestionCard(opts: {
  questionData: Question;
  userUid: string;
  userAnswer: Answer | undefined;
}) {
  const { questionData, userUid, userAnswer } = opts;
  // state to track whether to open the user's answer to the question
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  return (
    <Button
      key={questionData.uid}
      className="flex flex-col items-start bg-black-50 p-2 rounded-lg text-start h-auto"
    >
      <div className="flex items-center gap-x-10">
        <div>{questionData.question}</div>
        <div className="">{questionData.questionDate.toDateString()}</div>
      </div>
      <div className="text-sm">{userAnswer?.correctAnswer || '❌'}</div>
    </Button>
  );
}
