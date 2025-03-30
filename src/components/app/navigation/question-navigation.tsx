'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RouterBack from '../shared/router-back';
import LogoSmall from '@/components/ui/LogoSmall';
import ChallengeList from './challenge-list';

import { RoadmapUserQuestions } from '@prisma/client';

import { studyPaths } from '@/utils/constants/study-paths';

import { useQuestionSingle } from '@/contexts/question-single-context';

import { useStudyPathQuestions } from '@/hooks/use-study-path';
import { Question } from '@/types/Questions';

/**
 * Component for navigation between different questions from within the
 * app.
 */
export default function QuestionNavigation(opts: {
  nextPrevPromise: Promise<{
    nextQuestion: string | null | undefined;
    previousQuestion: string | null | undefined;
  } | null>;
  navigationType: 'question' | 'roadmap';
  slug: string;
}) {
  const { nextPrevPromise, navigationType = 'question', slug } = opts;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams?.get('type');
  const studyPathSlug = searchParams?.get('study-path');

  const { previousQuestion, setPreviousQuestion, nextQuestion, setNextQuestion, studyPath } =
    useQuestionSingle();

  const { questions, isLoading } = useStudyPathQuestions(studyPathSlug || '');

  useEffect(() => {
    console.log('Question navigation rendering with study path:', studyPathSlug);
    console.log('Questions loaded:', questions?.length || 0);
    console.log('Is loading:', isLoading);
  }, [questions, studyPathSlug, isLoading]);

  useEffect(() => {
    // if this is a study-path, get the next/prev questions from the study-path object
    const studyPath =
      type === 'study-path' && studyPathSlug
        ? studyPaths.find((path) => path.slug === studyPathSlug)
        : null;

    if (studyPath) {
      // Check if we're using overviewData
      if ('overviewData' in studyPath && studyPath.overviewData) {
        // Get all question slugs from the overviewData structure
        const allSlugs = Object.values(studyPath.overviewData as any)
          .flatMap((section: any) => section.questionSlugs || [])
          .filter(Boolean);

        // Find the current question's index in the flattened structure
        const currentIndex = allSlugs.indexOf(slug);

        // Get next and previous questions based on index
        const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;
        const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;

        // Set the full URLs in context
        setPreviousQuestion(
          prevSlug ? `${prevSlug}?type=${type}&study-path=${studyPathSlug}` : null
        );
        setNextQuestion(nextSlug ? `${nextSlug}?type=${type}&study-path=${studyPathSlug}` : null);
      } else {
        // Find the current question's index in the study path's questionSlugs
        const currentIndex = studyPath.questionSlugs.indexOf(slug);

        // Get next and previous questions based on index
        const nextSlug =
          currentIndex < studyPath.questionSlugs.length - 1
            ? studyPath.questionSlugs[currentIndex + 1]
            : null;
        const prevSlug = currentIndex > 0 ? studyPath.questionSlugs[currentIndex - 1] : null;

        // Set the full URLs in context
        setPreviousQuestion(
          prevSlug ? `${prevSlug}?type=${type}&study-path=${studyPathSlug}` : null
        );
        setNextQuestion(nextSlug ? `${nextSlug}?type=${type}&study-path=${studyPathSlug}` : null);
      }
    } else {
      // Use the provided promise for non-study-path questions
      nextPrevPromise.then((nextPrev) => {
        setNextQuestion(nextPrev?.nextQuestion);
        setPreviousQuestion(nextPrev?.previousQuestion);
      });
    }
  }, [pathname, searchParams, slug, type, nextPrevPromise, studyPathSlug]);

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <RouterBack href="/questions" className="px-0">
                <LogoSmall size={32} />
              </RouterBack>
            </TooltipTrigger>
            <TooltipContent side="bottom">Back to Questions</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="hidden md:block">
          {/** challenge list - provides quick access to the challenge list */}
          <TooltipProvider delayDuration={0} skipDelayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" padding="sm">
                  <ChallengeList type={type} studyPath={studyPath} questions={questions || []} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Challenge List</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex items-center">
        {/* Previous Question */}
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                href={previousQuestion || '#'}
                className={`p-2 rounded-l-md relative group duration-200 size-8 flex items-center justify-center border-r-0 ${
                  !previousQuestion ? 'opacity-50 pointer-events-none' : ''
                }`}
                variant="ghost"
              >
                <ChevronLeft className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                <ArrowLeft className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-white font-inter">
              {previousQuestion ? `Previous ${navigationType}` : `No previous ${navigationType}`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Next Question */}
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                href={nextQuestion || '#'}
                className={`p-2 rounded-r-md relative group duration-200 size-8 flex items-center justify-center ${
                  !nextQuestion ? 'opacity-50 pointer-events-none' : ''
                }`}
                variant="ghost"
              >
                <ChevronRight className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {nextQuestion ? `Next ${navigationType}` : `No next ${navigationType}`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export function RoadmapQuestionNavigation(opts: {
  nextRoadmapQuestion: RoadmapUserQuestions | null | undefined;
  prevRoadmapQuestion: RoadmapUserQuestions | null | undefined;
  roadmap: {
    title: string;
    uid: string;
  };
}) {
  const { nextRoadmapQuestion, prevRoadmapQuestion, roadmap } = opts;

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-x-2">
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="default"
                className="z-30 flex items-center gap-x-2 mr-2"
                href={`/roadmap/${roadmap?.uid}`}
              >
                <ArrowLeft className="size-4" />
                <span className="text-sm hidden sm:block">Back</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Back to {roadmap?.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center">
        {/* Previous Question */}
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`/roadmap/${prevRoadmapQuestion?.roadmapUid}/${prevRoadmapQuestion?.uid}`}
                className={`bg-primary border border-black-50 p-2 rounded-l-md relative group duration-200 size-9 flex items-center justify-center border-r-0 ${
                  !prevRoadmapQuestion ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <ChevronLeft className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                <ArrowLeft className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-white font-inter">
              {prevRoadmapQuestion ? `Previous Roadmap Question` : `No previous Roadmap Question`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Next Question */}
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`/roadmap/${nextRoadmapQuestion?.roadmapUid}/${nextRoadmapQuestion?.uid}`}
                className={`bg-primary border border-black-50 p-2 rounded-r-md relative group duration-200 size-9 flex items-center justify-center ${
                  !nextRoadmapQuestion ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <ChevronRight className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {nextRoadmapQuestion ? `Next Roadmap Question` : `No next Roadmap Question`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
