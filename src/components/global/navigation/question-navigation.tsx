'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StudyPath, studyPaths } from '@/utils/constants/study-paths';
import { Button } from '@/components/ui/button';

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

  const [nextQuestion, setNextQuestion] = useState<string | null | undefined>(
    null
  );
  const [previousQuestion, setPreviousQuestion] = useState<
    string | null | undefined
  >(null);

  const [studyPath, setStudyPath] = useState<StudyPath | null>(null);

  useEffect(() => {
    // if this is a study-path, get the next/prev questions from the study-path object
    const studyPath =
      type === 'study-path'
        ? studyPaths.find((path) => path.questionSlugs.includes(slug))
        : null;

    if (studyPath) {
      setStudyPath(studyPath);
      // Find the current question's index in the study path
      const currentIndex = studyPath.questionSlugs.indexOf(slug);

      // Get next and previous questions based on index
      setNextQuestion(
        currentIndex < studyPath.questionSlugs.length - 1
          ? studyPath.questionSlugs[currentIndex + 1]
          : null
      );
      setPreviousQuestion(
        currentIndex > 0 ? studyPath.questionSlugs[currentIndex - 1] : null
      );
    } else {
      // Use the provided promise for non-study-path questions
      nextPrevPromise.then((nextPrev) => {
        setNextQuestion(nextPrev?.nextQuestion);
        setPreviousQuestion(nextPrev?.previousQuestion);
      });
    }
  }, [pathname, searchParams, slug, type, nextPrevPromise]);

  // if this is a study-path, add the type to the previous question
  const previousQuestionUrl =
    type === 'study-path'
      ? `${previousQuestion}?type=${type}`
      : previousQuestion;

  const nextQuestionUrl =
    type === 'study-path' ? `${nextQuestion}?type=${type}` : nextQuestion;

  return (
    <div className="flex items-center">
      {type === 'study-path' && (
        <div className="flex items-center gap-x-2">
          <TooltipProvider delayDuration={0} skipDelayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="default"
                  className="z-30 flex items-center gap-x-2 mr-2"
                  href={`/questions/study-paths/${studyPath?.slug}`}
                >
                  <ArrowLeft className="size-4" />
                  <span className="text-sm hidden sm:block">Back</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Back to {studyPath?.title}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      <div className="flex items-center">
        {/* Previous Question */}
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={previousQuestionUrl || '#'}
                className={`bg-primary border border-black-50 p-2 rounded-l-md relative group duration-200 size-9 flex items-center justify-center border-r-0 ${
                  !previousQuestion ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <ChevronLeft className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                <ArrowLeft className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-white font-inter">
              {previousQuestion
                ? `Previous ${navigationType}`
                : `No previous ${navigationType}`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Next Question */}
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={nextQuestionUrl || '#'}
                className={`bg-primary border border-black-50 p-2 rounded-r-md relative group duration-200 size-9 flex items-center justify-center ${
                  !nextQuestion ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <ChevronRight className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {nextQuestion
                ? `Next ${navigationType}`
                : `No next ${navigationType}`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
