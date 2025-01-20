import { QuestionWithoutAnswers } from '@/types/Questions';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import TagDisplay from '@/components/app/questions/previous/tag-display';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import Link from 'next/link';
import Chip from '@/components/ui/chip';
import { Suspense } from 'react';
import { Circle } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { Answer } from '@/types/Answers';

export function QuestionCardSkeleton() {
  return (
    <div className="flex flex-col space-y-5 items-start bg-black-75 border border-black-50 p-5 rounded-lg w-full relative overflow-hidden">
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex w-full justify-between items-center">
          <div className="h-6 w-3/4 bg-black-50 rounded animate-pulse" />
        </div>
        <div className="text-start text-xs">
          <div className="h-5 w-24 bg-black-50 rounded animate-pulse" />
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="h-5 w-5 rounded-full bg-black-50 animate-pulse" />
        <div className="h-5 w-20 bg-black-50 rounded animate-pulse" />
      </div>
      <div className="mt-5 w-full flex justify-between items-end z-10 relative">
        <div className="flex gap-4 items-end">
          <div className="flex items-center gap-1">
            <div className="h-6 w-16 bg-black-50 rounded animate-pulse" />
            <div className="h-6 w-16 bg-black-50 rounded animate-pulse" />
            <div className="h-6 w-16 bg-black-50 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="h-6 w-20 bg-black-50 rounded animate-pulse" />
          <div className="h-6 w-24 bg-black-50 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// separate async component for stats to avoid blocking render
async function QuestionStats({
  identifier,
  value
}: {
  identifier: 'slug' | 'uid';
  value: string;
}) {
  const stats = await getQuestionStats(identifier, value);
  return (
    <p className="font-ubuntu text-sm text-gray-300">
      Submissions: <span>{stats.totalSubmissions}</span>
    </p>
  );
}

export default function QuestionCard(opts: {
  questionData: QuestionWithoutAnswers & { userAnswers: Answer[] };
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
    customQuestion = false
  } = opts;

  // if identifier is uid, this is a custom question
  const href =
    identifier === 'uid'
      ? `/question/custom/${questionData[identifier]}`
      : `/question/${questionData[identifier]}`;

  const title = questionData?.title || questionData?.question;

  return (
    <Link
      href={href}
      key={questionData.uid}
      className="flex flex-col space-y-5 items-start bg-black-75 border border-black-50 hover:border-black-100 duration-300 p-5 rounded-lg group w-full relative overflow-hidden group-has-[[data-pending]]:animate-pulse"
    >
      <div className="flex flex-col gap-y-4 md:gap-y-5 w-full">
        <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-5">
          <h6 className="text-lg text-wrap text-start line-clamp-2 flex-grow">
            {title}
          </h6>
          {questionData?.difficulty && (
            <div className="h-fit order-first md:order-last">
              <Chip
                text={capitalise(questionData.difficulty)}
                color={getQuestionDifficultyColor(questionData.difficulty).bg}
                textColor={
                  getQuestionDifficultyColor(questionData.difficulty).text
                }
                border={
                  getQuestionDifficultyColor(questionData.difficulty).border
                }
              />
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex items-center gap-x-2">
            {questionData.userAnswers && questionData.userAnswers.length > 0 ? (
              <div>
                {questionData.userAnswers[0].correctAnswer ? (
                  <CheckCircle className="flex-shrink-0 size-5 text-green-500" />
                ) : (
                  <Circle className="flex-shrink-0 size-5 text-black-50" />
                )}
              </div>
            ) : (
              <Circle className="flex-shrink-0 size-5 text-black-50" />
            )}
            <div className="text-sm text-gray-300">
              {questionData.userAnswers &&
              questionData.userAnswers.length > 0 ? (
                questionData.userAnswers[0].correctAnswer ? (
                  <p>Correct</p>
                ) : (
                  <p>Incorrect</p>
                )
              ) : (
                <div className="relative">
                  <p className="hover:opacity-0 transition-opacity duration-300 whitespace-nowrap flex items-center gap-x-1">
                    Not Answered
                  </p>
                </div>
              )}
            </div>
          </div>
          {showSubmissions && (
            <Suspense
              fallback={
                <div className="text-start text-[10px]">
                  <p className="font-ubuntu text-sm text-gray-400">
                    Submissions: loading...
                  </p>
                </div>
              }
            >
              <span className="hidden sm:block text-gray-300">•</span>
              <QuestionStats
                identifier={identifier}
                value={questionData[identifier] || ''}
              />
            </Suspense>
          )}
        </div>
      </div>

      <div className="w-full flex justify-between items-end z-10 relative">
        {!customQuestion && (questionData?.tags?.length ?? 0) > 0 && (
          <div className="flex gap-4 items-end mt-5 ">
            <div className="flex items-center gap-1 space-y-0.5 text-start">
              <TagDisplay
                tags={questionData?.tags || []}
                numberOfTags={numberOfTags}
                showcaseTag={showcaseTag}
                variant="secondary"
              />
            </div>
          </div>
        )}
        {questionData?.questionDate && questionData?.dailyQuestion && (
          <div className="flex items-center gap-x-3 mt-5">
            <Chip
              color="bg-black-100"
              text={questionData.questionDate}
              border="border-black-50"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
