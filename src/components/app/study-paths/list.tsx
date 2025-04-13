'use client';

import dynamic from 'next/dynamic';

import StudyPathQuestionCardClient from './study-path-question-card-client';
import { cn } from '@/lib/utils';

import type { Question } from '@/types/Questions';
import { StudyPath } from '@prisma/client';
import SubSectionCardClient from './subsection-card-client';

const QuestionCardClient = dynamic(() => import('../questions/layout/question-card-client'), {
  ssr: false,
});

// QuestionCardWrapper as a client component
const QuestionCardWrapper = ({
  question,
  studyPath,
  isFirstUnanswered,
  lessonIndex,
}: {
  question: Question;
  studyPath: StudyPath;
  isFirstUnanswered: boolean;
  lessonIndex: number;
}) => {
  return (
    <div className="relative group w-fit">
      {isFirstUnanswered && <StartBounce />}
      <StudyPathQuestionCardClient
        questionData={question}
        studyPath={studyPath}
        isNextQuestion={isFirstUnanswered}
        lessonIndex={lessonIndex}
      />
    </div>
  );
};

// SubSectionWrapper component
const SubSectionWrapper = ({
  subSection,
  studyPath,
  isFirstIncomplete,
  nextQuestionIndex,
}: {
  subSection: {
    key: string;
    sectionName: string;
    questionSlugs: string[];
    questions: Question[];
    completionPercentage: number;
    isIncomplete: boolean;
    isFirstIncompleteSubSection: boolean;
  };
  studyPath: StudyPath;
  isFirstIncomplete: boolean;
  nextQuestionIndex?: number;
}) => {
  return (
    <div className="relative group w-fit">
      {isFirstIncomplete && <StartBounce />}
      <SubSectionCardClient
        subSection={subSection}
        studyPath={studyPath}
        nextQuestionIndex={nextQuestionIndex}
      />
    </div>
  );
};

// Internal calculation function based on provided parameters
const getOffset = (
  index: number,
  offsetType: 'sine' | 'linear' | 'none',
  offsetMultiplier: number
) => {
  switch (offsetType) {
    case 'sine':
      return Math.sin(index * 2.5) * 25 * offsetMultiplier;
    case 'linear':
      return (index % 2 === 0 ? 1 : -1) * 20 * offsetMultiplier;
    case 'none':
    default:
      return 0;
  }
};

export default function StudyPathsList({
  questions,
  studyPath,
  calculateOffset,
  offsetType = 'sine',
  offsetMultiplier = 1,
  className,
}: {
  questions: Question[]; // No longer accepting a promise
  studyPath: StudyPath;
  calculateOffset?: (index: number) => number;
  offsetType?: 'sine' | 'linear' | 'none';
  offsetMultiplier?: number;
  className?: string;
}) {
  // Get question slugs based on whether we have overviewData or not
  let allQuestionSlugs: string[] = [];

  if (studyPath.overviewData) {
    // Extract slugs from overviewData sections
    allQuestionSlugs = Object.values(studyPath.overviewData || {})
      .flatMap((section: any) => section.questionSlugs || [])
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

  // Internal calculation function based on provided parameters
  const calculateOffsetValue = (index: number) => {
    if (calculateOffset) {
      return calculateOffset(index);
    }

    return getOffset(index, offsetType, offsetMultiplier);
  };

  return (
    <div className={cn('relative z-10 justify-self-center grid', className)}>
      {sortedQuestions.map((question, index) => {
        const offsetValue = calculateOffsetValue(index);
        // Find the question's index in the allQuestionSlugs array
        const lessonIndex = allQuestionSlugs.findIndex((slug) => slug === question.slug);
        return (
          <div key={question.slug} className="mb-8 flex justify-center">
            <QuestionCardClient questionData={question} offset={offsetValue}>
              <QuestionCardWrapper
                question={question}
                studyPath={studyPath}
                isFirstUnanswered={firstUnansweredQuestion === question.slug}
                lessonIndex={lessonIndex !== -1 ? lessonIndex : index}
              />
            </QuestionCardClient>
          </div>
        );
      })}
    </div>
  );
}

interface StudyPathsSubSectionListProps {
  studyPath: StudyPath;
  subSections: {
    key: string;
    sectionName: string;
    questionSlugs: string[];
    questions: Question[];
    completionPercentage: number;
    isIncomplete: boolean;
    isFirstIncompleteSubSection: boolean;
  }[];
  calculateOffset?: (index: number) => number;
  offsetType?: 'sine' | 'linear' | 'none';
  offsetMultiplier?: number;
  className?: string;
  nextQuestionIndex?: number;
}

export function StudyPathsSubSectionList({
  studyPath,
  subSections,
  calculateOffset,
  offsetType = 'sine',
  offsetMultiplier = 1,
  className,
}: StudyPathsSubSectionListProps) {
  // Internal calculation function based on provided parameters
  const calculateOffsetValue = (index: number) => {
    if (calculateOffset) {
      return calculateOffset(index);
    }

    return getOffset(index, offsetType, offsetMultiplier);
  };

  return (
    <div className={cn('relative z-10 justify-self-center grid', className)}>
      {subSections.map((subSection, index) => {
        const offsetValue = calculateOffsetValue(index);

        return (
          <div key={subSection.key} className="mb-8 flex justify-center">
            <QuestionCardClient
              questionData={
                {
                  uid: `subsection-${subSection.key}`,
                  title: subSection.sectionName,
                  slug: subSection.key,
                } as any
              }
              offset={offsetValue}
            >
              <SubSectionWrapper
                subSection={subSection}
                studyPath={studyPath}
                isFirstIncomplete={subSection.isFirstIncompleteSubSection}
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
