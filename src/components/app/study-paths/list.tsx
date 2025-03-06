import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { Question } from '@/types/Questions';
import type { StudyPath } from '@/utils/constants/study-paths';
import StudyPathQuestionCard from './study-path-question-card';
import StudyPathQuestionCardSkeleton from './study-path-question-card-skeleton';
import { cn } from '@/lib/utils';

const QuestionCardClient = dynamic(() => import('../questions/layout/question-card-client'), {
  ssr: false,
});

export default async function StudyPathsList({
  questions,
  studyPath,
  top,
  calculateOffset,
  className,
}: {
  questions: Promise<Question[]> | Question[];
  studyPath: StudyPath;
  top?: number;
  calculateOffset?: (index: number) => number;
  className?: string;
}) {
  // either a promise or already resolved
  const studyPathQuestions = Array.isArray(questions) ? questions : await questions;

  const sortedQuestions = studyPath.questionSlugs
    .map((slug) => studyPathQuestions.find((q) => q.slug === slug))
    .filter((q): q is Question => q !== undefined);

  const firstUnansweredQuestion = sortedQuestions.find(
    (q) => !q.userAnswers?.length || q.userAnswers?.some((answer) => answer.correctAnswer === false)
  )?.slug;

  return (
    <div className={cn('relative z-10 justify-self-center', className)}>
      <Suspense fallback={<StudyPathQuestionCardSkeleton />}>
        {sortedQuestions.map((question, index) => {
          const offsetValue = calculateOffset ? calculateOffset(index) : Math.sin(index * 2.5) * 25;
          return (
            <div key={question.slug} className="mb-4">
              <QuestionCardClient
                questionData={question}
                index={index}
                offset={offsetValue}
                top={top}
              >
                <QuestionCardWrapper
                  question={question}
                  studyPath={studyPath}
                  isFirstUnanswered={firstUnansweredQuestion === question.slug}
                />
              </QuestionCardClient>
            </div>
          );
        })}
      </Suspense>
    </div>
  );
}

function QuestionCardWrapper({
  question,
  studyPath,
  isFirstUnanswered,
}: {
  question: Question;
  studyPath: StudyPath;
  isFirstUnanswered: boolean;
}) {
  return (
    <div className="relative group w-full">
      {isFirstUnanswered && <StartBounce />}
      <StudyPathQuestionCard
        href={`/question/${question.slug}?type=study-path&study-path=${studyPath.slug}`}
        questionData={question}
        className="group-hover:scale-[0.99] active:scale-[0.98] transition-transform duration-200"
      />
    </div>
  );
}

function StartBounce() {
  return (
    <div
      id="roadmap-start"
      className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-full z-20"
    >
      <div className="animate-start-bounce">
        <div className="relative bg-black border-2 border-black-50 text-green-500 px-4 py-2 rounded-lg font-semibold shadow-lg flex items-center group-hover:scale-[0.99] transition-transform duration-200 text-lg">
          <span className="font-onest text-lg">Start</span>
          <div className="absolute w-3 h-3 bg-black border-r-2 border-b-2 border-black-50 transform rotate-45 left-1/2 -bottom-1.5 -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
}
