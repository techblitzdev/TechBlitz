import { lazy, Suspense } from 'react';

import QuestionNavigation from '@/components/app/navigation/question-navigation';
import QuestionNavigationLoading from '@/components/app/navigation/question-navigation-loading';
import RouterBack from '@/components/app/shared/router-back';
import { HomeIcon } from 'lucide-react';
import QuestionActionButtons from './question-action-buttons';
import FeedbackButton from '@/components/app/shared/feedback/feedback-button';
import FlagIcon from '@/components/ui/icons/flag';

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
}

export default function QuestionPageHeader({
  question,
  nextAndPreviousQuestionPromise,
}: QuestionPageHeaderProps) {
  if (!question.slug) {
    return null;
  }

  return (
    <div className="grid grid-cols-12 items-center justify-between pt-2 px-3 relative">
      <div className="col-span-2 lg:col-span-4 flex items-center justify-start">
        <RouterBack href="/coding-challenges" className="px-0 block md:hidden">
          <HomeIcon width="16" height="16" />
        </RouterBack>
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <RouterBack href="/coding-challenges" className="px-0 hidden md:block">
                <LogoSmall size={32} />
              </RouterBack>
            </TooltipTrigger>
            <TooltipContent side="bottom">Back to Questions</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* Challenge List - only available for standard questions, not study paths */}
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
      </div>
      {question.questionType !== 'SIMPLE_MULTIPLE_CHOICE' && (
        <div className="col-span-7 lg:col-span-4 flex items-center justify-center">
          <Suspense fallback={<div>Loading...</div>}>
            <QuestionActionButtons />
          </Suspense>
        </div>
      )}
      <div
        className={`col-span-3 lg:col-span-4 flex items-center gap-x-1 md:gap-x-3 justify-end ${
          question.questionType === 'SIMPLE_MULTIPLE_CHOICE' ? 'col-start-10 lg:col-start-12' : ''
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
