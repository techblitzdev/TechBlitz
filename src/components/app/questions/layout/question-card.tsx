import { QuestionWithoutAnswers } from '@/types/Questions';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import TagDisplay from '@/components/app/questions/previous/tag-display';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import Link from 'next/link';
import Chip from '@/components/ui/chip';
import { Suspense } from 'react';

// separate async component for stats to avoid blocking render
async function QuestionStats({
  identifier,
  value,
}: {
  identifier: 'slug' | 'uid';
  value: string;
}) {
  const stats = await getQuestionStats(identifier, value);
  return (
    <div className="text-start text-[10px]">
      <p className="font-ubuntu text-sm">
        Submissions:{' '}
        <span className="font-medium">{stats.totalSubmissions}</span>
      </p>
    </div>
  );
}

export default function QuestionCard(opts: {
  questionData: QuestionWithoutAnswers;
  showSubmissions?: boolean;
  numberOfTags?: number;
  showcaseTag?: string;
  identifier: 'slug' | 'uid';
  customQuestion?: boolean;
}) {
  const {
    questionData,
    showSubmissions = true,
    numberOfTags = 3,
    showcaseTag,
    identifier = 'slug',
    customQuestion = false,
  } = opts;

  // if identifier is uid, this is a custom question
  const href =
    identifier === 'uid'
      ? `/question/custom/${questionData[identifier]}`
      : `/question/${questionData[identifier]}`;

  return (
    <Link
      href={href}
      key={questionData.uid}
      className="flex flex-col space-y-5 items-start bg-black-75 border border-black-50 hover:border-accent duration-300 p-5 rounded-lg group w-full relative overflow-hidden"
    >
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex w-full justify-between items-center">
          <h6 className="text-base text-wrap text-start line-clamp-2 flex-grow">
            {questionData?.question}
          </h6>
        </div>
        {showSubmissions && (
          <Suspense
            fallback={
              <div className="text-start text-[10px]">
                <p className="font-ubuntu text-sm">Loading stats...</p>
              </div>
            }
          >
            <QuestionStats
              identifier={identifier}
              value={questionData[identifier] || ''}
            />
          </Suspense>
        )}
      </div>
      <div className="mt-5 w-full flex justify-between items-end z-10 relative">
        {!customQuestion && (
          <div className="flex gap-4 items-end">
            {questionData?.tags?.length && questionData?.tags?.length > 0 && (
              <div className="flex items-center gap-1 space-y-0.5 text-start">
                <TagDisplay
                  tags={questionData?.tags || []}
                  numberOfTags={numberOfTags}
                  showcaseTag={showcaseTag}
                />
              </div>
            )}
          </div>
        )}
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
