import { QuestionWithoutAnswers } from '@/types/Questions';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import TagDisplay from '@/components/app/questions/previous/tag-display';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import Link from 'next/link';
import Chip from '@/components/ui/chip';

export default async function QuestionCard(opts: {
  questionData: QuestionWithoutAnswers;
  showSubmissions?: boolean;
  numberOfTags?: number;
  showcaseTag?: string;
}) {
  const {
    questionData,
    showSubmissions = true,
    numberOfTags = 3,
    showcaseTag,
  } = opts;

  const questionStats = showSubmissions
    ? await getQuestionStats(questionData.uid)
    : null;

  return (
    <Link
      href={`/question/${questionData.uid}`}
      key={questionData.uid}
      className="flex flex-col space-y-5 items-start border border-black-50 hover:border-accent duration-300 p-5 rounded-lg group w-full relative overflow-hidden"
    >
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex w-full justify-between">
          <h6 className="text-base text-wrap text-start line-clamp-3">
            {questionData?.question}
          </h6>
        </div>
        {showSubmissions && (
          <div className="text-start text-[10px]">
            <p className="font-ubuntu text-sm">
              Submissions:{' '}
              <span className="font-medium underline">
                {questionStats?.totalSubmissions}
              </span>
            </p>
          </div>
        )}
      </div>
      <div className="mt-5 w-full flex justify-between items-end z-10 relative">
        <div className="flex gap-4 items-end">
          {questionData?.tags?.length
            ? questionData?.tags?.length > 0 && (
                <div className="space-y-0.5 text-start">
                  <div className="flex items-center gap-1">
                    <TagDisplay
                      tags={questionData?.tags || []}
                      numberOfTags={numberOfTags}
                      showcaseTag={showcaseTag}
                    />
                  </div>
                </div>
              )
            : ''}
        </div>
        <div className="flex items-center gap-x-3">
          {questionData?.difficulty && (
            <Chip
              text={capitalise(questionData.difficulty)}
              color={getQuestionDifficultyColor(questionData.difficulty).bg}
              textColor={
                getQuestionDifficultyColor(questionData.difficulty).text
              }
              border={
                getQuestionDifficultyColor(questionData.difficulty).border
              }
              small
            />
          )}
          {/** question date */}
          {questionData?.questionDate && questionData?.dailyQuestion && (
            <Chip
              color="bg-black-100"
              text={questionData.questionDate}
              border="border-black-50"
            />
          )}
        </div>
      </div>
    </Link>
  );
}
