import { QuestionWithoutAnswers } from '@/types/Questions';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Chip from '../global/chip';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import { Grid } from '../ui/grid';
import TagDisplay from './previous/tag-display';
import { getQuestionStats } from '@/actions/questions/get-question-stats';
import Link from 'next/link';

export default async function QuestionCard(opts: {
  questionData: QuestionWithoutAnswers;
  userUid: string;
}) {
  const { questionData } = opts;

  const questionStats = await getQuestionStats(questionData.uid);

  return (
    <>
      <Link
        href={`/question/${questionData.uid}`}
        key={questionData.uid}
        className="space-y-5 items-start bg-black-75 border border-black-50 p-5 rounded-lg group w-full h-auto flex flex-col relative overflow-hidden"
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
              Submissions:{' '}
              <span className="font-medium underline">
                {questionStats?.totalSubmissions}
              </span>
            </p>
            <p className="font-ubuntu text-sm">
              Correct submissions:{' '}
              <span className="font-medium underline">
                {questionStats?.percentageCorrect}%
              </span>
            </p>
          </div>
        </div>
        <div className="mt-5 w-full flex justify-between items-end">
          <div className="flex gap-4 items-end">
            {questionData?.tags?.length
              ? questionData?.tags?.length > 0 && (
                  <div className="space-y-0.5 text-start">
                    <div className="flex items-center gap-1">
                      <TagDisplay tags={questionData?.tags || []} />
                    </div>
                  </div>
                )
              : ''}
          </div>
          <div className="flex items-center gap-x-3">
            {questionData?.difficulty && (
              <Chip
                text={capitalise(questionData.difficulty)}
                color={getQuestionDifficultyColor(questionData.difficulty)}
                textColor={getQuestionDifficultyColor(questionData.difficulty)}
                ghost
                small
              />
            )}
            {/** question date */}
            {questionData?.questionDate && (
              <Chip
                color="black-100"
                text={questionData.questionDate}
                border="black-50"
              />
            )}
          </div>
        </div>
        <Grid size={20} position="bottom-right" />
      </Link>
      {/* {showAnswerModal && (
        <PreviousQuestionAnswerModal
          isOpen={showAnswerModal !== undefined}
          onClose={() => setShowAnswerModal(undefined)}
          userAnswer={showAnswerModal}
          questionData={questionData}
        />
      )} */}
    </>
  );
}
