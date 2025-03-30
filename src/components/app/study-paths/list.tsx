'use client';

import dynamic from 'next/dynamic';

import StudyPathQuestionCardClient from './study-path-question-card-client';
import { cn } from '@/lib/utils';

import type { Question } from '@/types/Questions';
import { StudyPath } from '@prisma/client';

const QuestionCardClient = dynamic(() => import('../questions/layout/question-card-client'), {
  ssr: false,
});

// QuestionCardWrapper as a client component
const QuestionCardWrapper = ({
  question,
  studyPath,
  isFirstUnanswered,
}: {
  question: Question;
  studyPath: StudyPath;
  isFirstUnanswered: boolean;
}) => {
  return (
    <div className="relative group w-fit">
      {isFirstUnanswered && <StartBounce />}
      <StudyPathQuestionCardClient
        questionData={question}
        studyPath={studyPath}
        isNextQuestion={isFirstUnanswered}
      />
    </div>
  );
};

export default function StudyPathsList({
  questions,
  studyPath,
  calculateOffset,
  className,
}: {
  questions: Question[]; // No longer accepting a promise
  studyPath: StudyPath;
  calculateOffset?: (index: number) => number;
  className?: string;
}) {
  // Get question slugs based on whether we have overviewData or not
  let allQuestionSlugs: string[] = [];

  if (studyPath.overviewData) {
    // Extract slugs from overviewData sections
    allQuestionSlugs = Object.values(studyPath.overviewData)
      .flatMap((section: any) => section.questionSlugs)
      .filter(Boolean);
  } else {
    // Use regular questionSlugs
    allQuestionSlugs = studyPath.questionSlugs || [];
  }

  // Find and sort questions based on the slugs
  const sortedQuestions = allQuestionSlugs
    .map((slug) => questions.find((q) => q.slug === slug))
    .filter((q): q is Question => q !== undefined);

  const firstUnansweredQuestion = sortedQuestions.find(
    (q) => !q.userAnswers?.length || q.userAnswers?.some((answer) => answer.correctAnswer === false)
  )?.slug;

  return (
    <div className={cn('relative z-10 justify-self-center grid', className)}>
      {sortedQuestions.map((question, index) => {
        const offsetValue = calculateOffset ? calculateOffset(index) : Math.sin(index * 2.5) * 25;
        return (
          <div key={question.slug} className="mb-8 flex justify-center">
            <QuestionCardClient questionData={question} offset={offsetValue}>
              <QuestionCardWrapper
                question={question}
                studyPath={studyPath}
                isFirstUnanswered={firstUnansweredQuestion === question.slug}
              />
            </QuestionCardClient>
          </div>
        );
      })}
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
