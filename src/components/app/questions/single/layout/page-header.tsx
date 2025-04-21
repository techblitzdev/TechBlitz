import { lazy, Suspense } from 'react';

import QuestionNavigation from '@/components/app/navigation/question-navigation';
import QuestionNavigationLoading from '@/components/app/navigation/question-navigation-loading';
import RouterBack from '@/components/app/shared/router-back';
import { HomeIcon } from 'lucide-react';
import QuestionActionButtons from './question-action-buttons';
import FeedbackButton from '@/components/app/shared/feedback/feedback-button';
import FlagIcon from '@/components/ui/icons/flag';
import { Progress } from '@/components/ui/progress';

const UpgradeModalButton = lazy(() => import('@/components/app/shared/upgrade/upgrade-modal'));

import { Question } from '@/types/Questions';
import LogoSmall from '@/components/ui/LogoSmall';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import RandomQuestion from '@/components/shared/random-question';

// Define navigation interface to match the data from getNextAndPreviousQuestion
interface NavigationData {
  nextQuestion: string | null | undefined;
  previousQuestion: string | null | undefined;
}

interface QuestionPageHeaderProps {
  question: Question;
  nextAndPreviousQuestionPromise: Promise<NavigationData | null>;
  isStudyPathLesson?: boolean;
  studyPathSlug?: string;
  studyPathMetadata?: {
    lessonIndex: number;
    totalLessons: number;
    subSection?: string;
    subSectionName?: string;
  };
}

export default function QuestionPageHeader({
  question,
  nextAndPreviousQuestionPromise,
  isStudyPathLesson,
  studyPathSlug,
  studyPathMetadata,
}: QuestionPageHeaderProps) {
  if (!question.slug) {
    return null;
  }

  // Calculate progress percentage for roadmap lessons
  const progressPercentage = studyPathMetadata
    ? Math.round(((studyPathMetadata.lessonIndex + 1) / studyPathMetadata.totalLessons) * 100)
    : 0;

  return (
    <div className="grid grid-cols-12 gap-4 py-4 items-center justify-between relative bg-black-100 border-b border-black-50 shadow-lg">
      <div className="col-span-2 flex items-center justify-start">
        {/* Challenge List - only available for standard questions, not study paths */}
        {!isStudyPathLesson && (
          <div className="items-center hidden md:flex">
            <Suspense fallback={<QuestionNavigationLoading />}>
              <QuestionNavigation
                navigationType="question"
                slug={question.slug}
                nextPrevPromise={nextAndPreviousQuestionPromise}
                randomQuestionComponent={
                  <RandomQuestion identifier="slug" currentQuestionSlug={question.slug} />
                }
              />
            </Suspense>
          </div>
        )}
      </div>
      {question.questionType !== 'SIMPLE_MULTIPLE_CHOICE' && (
        <div className="col-span-7 lg:col-span-4 flex items-center justify-center">
          <Suspense fallback={<div>Loading...</div>}>
            <QuestionActionButtons />
          </Suspense>
        </div>
      )}
      {/* Progress bar for roadmap lessons */}
      {isStudyPathLesson && studyPathMetadata && (
        <div className="col-span-8 bg-black-100 flex items-center gap-6">
          <RouterBack
            href="/coding-challenges"
            className="px-0 block md:hidden hover:opacity-80 transition-opacity"
          >
            <HomeIcon width="16" height="16" />
          </RouterBack>

          <TooltipProvider delayDuration={0} skipDelayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <RouterBack
                  href={isStudyPathLesson ? `/roadmaps/${studyPathSlug}` : '/coding-challenges'}
                  className="p-0 hidden md:block hover:opacity-80 transition-opacity"
                >
                  <LogoSmall size={32} />
                </RouterBack>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                Back to Questions
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex-1 flex flex-col gap-1">
            <Progress
              value={progressPercentage}
              className="h-2 bg-black-50 rounded-full w-full"
              indicatorColor={progressPercentage === 100 ? 'bg-green-500' : 'bg-accent'}
            />
          </div>
        </div>
      )}
      <div
        className={`col-span-2 flex items-center gap-x-1 md:gap-x-3 ${
          question.questionType === 'SIMPLE_MULTIPLE_CHOICE' ? 'col-start-11' : ''
        }`}
      >
        <Suspense fallback={null}>
          <FeedbackButton
            feedbackModalTitle="Report a problem"
            feedbackModalDescription="If you're experiencing issues with this question, please let us know so we can fix it."
            reference={question?.slug || undefined}
            icon={<FlagIcon height="1.5rem" width="1.5rem" />}
          />
          <div className="hidden lg:block">
            <UpgradeModalButton />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
