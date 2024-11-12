import { Question } from '@/types/Questions';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Answer } from '@/types/Answers';
import PreviousQuestionAnswerModal from '../../answers/previous-question-answer-modal';
import { ArrowUpRight } from 'lucide-react';
import Chip from '../../global/chip';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import { Grid } from '../../ui/grid';

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
        className="space-y-5 items-start bg-black-75 border border-black-50 p-5 rounded-lg group w-full h-auto flex flex-col relative overflow-hidden"
        onClick={() => setShowAnswerModal(userAnswer || undefined)}
      >
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between">
            <h6 className="text-base text-wrap text-start">
              {questionData.question}
            </h6>
            <Button variant="accent" className="size-10" padding="none">
              <ArrowUpRight className="size-5 group-hover:rotate-45 duration-300" />
            </Button>
          </div>
          <div className="text-start text-[10px]">
            <p className="font-ubuntu text-sm">
              Submissions: <span className="font-medium underline">1036</span>
            </p>
            <p className="font-ubuntu text-sm">
              Correct submissions:{' '}
              <span className="font-medium underline">872</span>
            </p>
          </div>
        </div>
        <div className="mt-5 w-full flex justify-between items-end">
          <div className="flex items-center gap-10">
            {questionData?.tags && (
              <div className="space-y-0.5">
                <p className="font-ubuntu text-xs">Tags</p>
                <div className="flex items-center gap-1">
                  {questionData?.tags?.map((tag) => (
                    <div key={tag.tagId}>
                      <Chip color="accent" text={capitalise(tag.tag.name)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {questionData?.difficulty && (
              <Chip
                text={capitalise(questionData.difficulty)}
                color={getQuestionDifficultyColor(questionData.difficulty)}
                textColor={getQuestionDifficultyColor(questionData.difficulty)}
                ghost
                small
              />
            )}
          </div>
          {/** question date */}
          {questionData?.questionDate && (
            <Chip
              color="black-100"
              text={questionData.questionDate}
              border="black-50"
            />
          )}
        </div>
        <Grid size={20} position="bottom-right" />
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
