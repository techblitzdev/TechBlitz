import { Suspense, use } from 'react';

import { cn } from '@/lib/utils';
import { ChevronRight, List } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useQuestionSingle } from '@/contexts/question-single-context';
import QuestionCard from '../questions/layout/question-card';
import Link from 'next/link';
import ChallengeListClient from './challenge-list-client';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { Tooltip } from '@/components/ui/tooltip';
import { Questions, StudyPath } from '@prisma/client';
import StudyPathsList from '../study-paths/list';
import StudyPathQuestionCardSkeleton from '@/components/app/study-paths/study-path-question-card-skeleton';
import QuestionCardClient from '../questions/layout/question-card-client';
import { Question } from '@/types/Questions';

function StudyPathsListSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 relative z-10 w-[80%] mx-auto">
      {Array.from({ length: 9 }).map((_, index) => (
        <QuestionCardClient
          key={index}
          questionData={null}
          index={index}
          offset={Math.sin(index * 0.9) * 4}
        >
          <StudyPathQuestionCardSkeleton />
        </QuestionCardClient>
      ))}
    </div>
  );
}

type ChallengeListProps = {
  className?: string;
  type?: string | null;
  studyPath?: StudyPath | null;
  questions?: Promise<Question[]> | Question[];
};

export default function ChallengeList({
  className,
  type,
  studyPath,
  questions,
}: ChallengeListProps) {
  const { relatedQuestions, user, suggestedQuestions } = useQuestionSingle();

  let questionsToShow = relatedQuestions;
  let suggestedQuestionsToShow = suggestedQuestions;

  if (!questionsToShow) return null;
  if (!suggestedQuestionsToShow) return null;

  const relatedQuestionsData = use(questionsToShow);
  const suggestedQuestionsData = use(suggestedQuestionsToShow);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className={cn('flex items-center gap-x-2', className)}>
          <List className="size-4" />
          <p className="text-sm font-medium">
            {type === 'study-path' ? 'Roadmap List' : 'Challenge List'}
          </p>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black-75 sm:max-w-xl">
        <div className="flex flex-col h-full gap-10">
          <Link
            href={studyPath ? `/roadmaps/${studyPath.slug}` : '/questions'}
            className="flex items-center gap-x-2 group"
          >
            <h6 className="text-xl font-bold">
              {type === 'study-path' ? 'Roadmap List' : 'Challenge List'}
            </h6>
            <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <div className="flex-1 overflow-y-scroll">
            <ChallengeListClient>
              {type === 'study-path' && studyPath ? (
                <>
                  <Suspense fallback={<StudyPathsListSkeleton />}>
                    <StudyPathsList questions={questions || []} studyPath={studyPath} />
                  </Suspense>
                </>
              ) : (
                <>
                  {relatedQuestionsData?.map((question) => (
                    <QuestionCard
                      key={question.uid}
                      questionData={question}
                      identifier="slug"
                      user={user}
                      className="border-none p-0 py-1"
                      numberOfTags={0}
                      titleClassName="text-base"
                    />
                  ))}
                </>
              )}
            </ChallengeListClient>
          </div>
          {/* Place your bottom element here */}
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-x-2">
              <h6 className="font-medium text-xs">Recommended Challenge</h6>
              <TooltipProvider delayDuration={0} skipDelayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <QuestionMarkCircledIcon className="size-3 text-white" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a recommended challenge based on your answer history.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <ChallengeListClient>
              <QuestionCard
                key={suggestedQuestionsData[0].uid}
                questionData={suggestedQuestionsData[0]}
                identifier="slug"
                user={user}
                className="bg-black"
                numberOfTags={0}
              />
            </ChallengeListClient>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
