import type { QuestionWithoutAnswers } from '@/types/Questions';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import TagDisplay from '@/components/app/questions/previous/tag-display';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import Link from 'next/link';
import Chip from '@/components/ui/chip';
import { Suspense } from 'react';
import { Bookmark, Circle } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import type { Answer } from '@/types/Answers';
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from '@/components/ui/tooltip';
import type { UserRecord } from '@/types/User';
import { cn } from '@/lib/utils';

export function QuestionCardSkeleton() {
  return (
    <div className="flex flex-col space-y-5 items-start bg-black-75 border border-black-50 p-5 rounded-lg w-full relative overflow-hidden">
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex items-center gap-x-2">
          <div className="h-5 w-5 rounded-full bg-black-50 animate-pulse" />
          <div className="h-6 w-3/4 bg-black-50 rounded animate-pulse" />
        </div>
        <div className="text-start text-xs">
          <div className="h-5 w-24 bg-black-50 rounded animate-pulse" />
        </div>
      </div>
      <div className="flex items-center gap-x-2">
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
  value,
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
  user: UserRecord | null;
  recommendedQuestion?: boolean;
}) {
  const {
    questionData,
    showSubmissions = true,
    numberOfTags = 3,
    showcaseTag,
    identifier = 'slug',
    customQuestion = false,
    user,
    recommendedQuestion = false,
  } = opts;

  // if identifier is uid, this is a custom question
  const href =
    identifier === 'uid'
      ? `/question/custom/${questionData[identifier]}`
      : `/question/${questionData[identifier]}`;

  const title = questionData?.title || questionData?.question;

  const userCanAccess =
    user?.userLevel === 'PREMIUM' || !questionData?.isPremiumQuestion;

  return (
    <Link
      href={href}
      key={questionData.uid}
      className={cn(
        'flex flex-col space-y-5 items-start bg-black-75 border border-black-50 hover:border-black-100 duration-300 p-5 rounded-lg group w-full relative overflow-hidden group-has-[[data-pending]]:animate-pulse',
        recommendedQuestion && 'border-accent'
      )}
    >
      <div className="flex flex-col gap-y-4 md:gap-y-5 w-full">
        <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-5">
          <div className="flex items-center gap-x-2">
            {questionData.userAnswers && questionData.userAnswers.length > 0 ? (
              questionData.userAnswers[0].correctAnswer ? (
                <CheckCircle className="flex-shrink-0 size-5 text-green-500" />
              ) : (
                <Circle className="flex-shrink-0 size-5 text-black-50" />
              )
            ) : (
              <Circle className="flex-shrink-0 size-5 text-black-50" />
            )}
            <h6 className="text-lg text-wrap text-start line-clamp-2 flex-grow">
              {title}
            </h6>
          </div>
          {questionData?.difficulty && userCanAccess ? (
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
          ) : (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div className="h-fit order-first md:order-last">
                    <Chip
                      text="Premium"
                      color="bg-gradient-to-r from-yellow-400 to-yellow-600"
                      textColor="text-black"
                      border="border-yellow-500"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrade to Premium to access this question</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
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
              <QuestionStats
                identifier={identifier}
                value={questionData[identifier] || ''}
              />
            </Suspense>
          )}
          {recommendedQuestion && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div className="flex items-center gap-x-2">
                    <span className="hidden sm:block text-gray-300">•</span>
                    <p className="text-sm text-gray-300">Recommended for you</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Based on your previous answers and current skill level, we
                    recommend this question to advance your skills
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <div className="w-full flex justify-between items-end z-10 relative">
        {!customQuestion && (questionData?.tags?.length ?? 0) > 0 && (
          <div className="flex gap-4 items-end ">
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
        {questionData?.bookmarks && questionData?.bookmarks.length > 0 && (
          <div className="flex items-center gap-x-3">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Bookmark
                    className={`size-5 ${
                      questionData?.bookmarks.length > 0
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-white'
                    } transition-colors duration-200`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>You have bookmarked this question</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        {questionData?.questionDate && questionData?.dailyQuestion && (
          <div className="flex items-center gap-x-3">
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
