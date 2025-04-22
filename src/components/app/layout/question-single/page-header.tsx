import { lazy, Suspense } from 'react';

import QuestionNavigation from '@/components/app/navigation/question-navigation';
import QuestionNavigationLoading from '@/components/app/navigation/question-navigation-loading';
import RouterBack from '@/components/app/shared/router-back';
import { HomeIcon, XIcon } from 'lucide-react';
import FeedbackButton from '@/components/app/shared/feedback/feedback-button';
import FlagIcon from '@/components/ui/icons/flag';

const UpgradeModalButton = lazy(() => import('@/components/app/shared/upgrade/upgrade-modal'));

import { Question } from '@/types/Questions';
import LogoSmall from '@/components/ui/LogoSmall';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import RandomQuestion from '@/components/shared/random-question';
import QuestionPageHeaderMiddle from './page-header-middle';
import { cn } from '@/lib/utils';

// Define navigation interface to match the data from getNextAndPreviousQuestion
interface NavigationData {
  nextQuestion: string | null | undefined;
  previousQuestion: string | null | undefined;
}

interface QuestionPageHeaderProps {
  question: Question;
  nextAndPreviousQuestionPromise?: Promise<NavigationData | null>;
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

  return (
    <div
      className={cn(
        'grid grid-cols-12 gap-4 py-2 items-center justify-between relative border-b border-black-50 shadow-lg px-3'
      )}
    >
      <div className="col-span-2 flex items-center justify-start">
        <>
          <RouterBack
            href={isStudyPathLesson ? `/roadmaps/${studyPathSlug}` : '/coding-challenges'}
            className="px-0 block md:hidden hover:opacity-80 transition-opacity"
          >
            <HomeIcon width="16" height="16" />
          </RouterBack>

          <TooltipProvider delayDuration={0} skipDelayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <RouterBack
                  href={isStudyPathLesson ? `/roadmaps/${studyPathSlug}` : '/coding-challenges'}
                  className="p-0 hidden md:block hover:opacity-80 transition-opacity group relative"
                >
                  <div className="transition-opacity duration-200 group-hover:opacity-0">
                    <LogoSmall size={32} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:cursor-pointer">
                    <XIcon width="24" height="24" />
                  </div>
                </RouterBack>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                Back to Questions
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
        {/* Challenge List - only available for standard questions, not study paths */}
        {!isStudyPathLesson && nextAndPreviousQuestionPromise && (
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

      {/* Progress bar for roadmap lessons */}
      <div className="col-span-8 flex items-center justify-center gap-6">
        <QuestionPageHeaderMiddle question={question} studyPathMetadata={studyPathMetadata} />
      </div>
      <div className="col-span-2 flex items-center gap-x-1 md:gap-x-3 col-start-12 justify-end">
        <Suspense fallback={null}>
          <div className="hidden lg:block">
            <UpgradeModalButton />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
