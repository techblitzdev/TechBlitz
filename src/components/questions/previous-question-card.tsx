import { Question } from '@/types/Questions';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Answer } from '@/types/Answers';
import PreviousQuestionAnswerModal from '../answers/previous-question-answer-modal';
import { ArrowUpRight } from 'lucide-react';
import Chip from '../global/chip';
import { capitalise } from '@/utils';

export default function PreviousQuestionCard(opts: {
  questionData: Question;
  userUid: string;
  userAnswer: Answer | undefined;
}) {
  const { questionData, userAnswer } = opts;
  // state to track whether to open the user's answer to the question
  const [showAnswerModal, setShowAnswerModal] = useState<Answer | undefined>(
    undefined
  );

  return (
    <>
      <Button
        key={questionData.uid}
        className="space-y-5 items-start bg-black-75 border border-black-50 p-5 rounded-lg group w-full h-auto flex flex-col"
        onClick={() => setShowAnswerModal(userAnswer || undefined)}
      >
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between">
            <h6 className="text-base">{questionData.question}</h6>
            <Button variant="accent" className="size-10" padding="none">
              <ArrowUpRight className="size-5 group-hover:rotate-45 duration-300" />
            </Button>
          </div>
          <div className="text-start text-[10px]">
            <p>Submissions:</p>
            <p>Correct submissions:</p>
          </div>
        </div>
        <div className="mt-5 w-full flex">
          {questionData?.tags && (
            <div className="space-y-0.5">
              <p>Tags</p>
              <div className="flex items-center gap-1">
                {questionData?.tags?.map((tag) => (
                  <Chip color="accent" text={capitalise(tag.tag.name)} />
                ))}
              </div>
            </div>
          )}
          {questionData?.difficulty && (
            <div className="space-y-0.5">
              <p>Difficulty</p>
            </div>
          )}
        </div>
      </Button>
      {showAnswerModal && (
        <PreviousQuestionAnswerModal
          isOpen={showAnswerModal !== undefined}
          onClose={() => setShowAnswerModal(undefined)}
          userAnswer={showAnswerModal}
          questionData={questionData}
        />
      )}
    </>
  );
}
