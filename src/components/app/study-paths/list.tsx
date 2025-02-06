import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { Question } from '@/types/Questions';
import type { StudyPath } from '@/utils/constants/study-paths';
import StudyPathQuestionCard from './study-path-question-card';

const QuestionCardClient = dynamic(() => import('../questions/layout/question-card-client'), {
  ssr: false,
});

export default async function StudyPathsList({
  questions,
  studyPath,
}: {
  questions: Promise<Question[]>;
  studyPath: StudyPath;
}) {
  const studyPathQuestions = await questions;

  const sortedQuestions = studyPath.questionSlugs
    .map((slug) => studyPathQuestions.find((q) => q.slug === slug))
    .filter((q): q is Question => q !== undefined);

  const firstUnansweredQuestion = sortedQuestions.find(
    (q) => !q.userAnswers?.length || q.userAnswers?.some((answer) => answer.correctAnswer === false)
  )?.slug;

  return (
    <div className="relative min-h-[800px]">
      <Suspense fallback={<div>Loading questions...</div>}>
        <div className="relative w-full z-10">
          {sortedQuestions.map((question, index) => (
            <QuestionCardClient
              key={question.slug}
              questionData={question}
              index={index}
              offset={Math.sin(index * 0.9) * 4}
            >
              <QuestionCardWrapper
                question={question}
                isFirstUnanswered={firstUnansweredQuestion === question.slug}
              />
            </QuestionCardClient>
          ))}
        </div>
      </Suspense>
    </div>
  );
}

function QuestionCardWrapper({
  question,
  isFirstUnanswered,
}: {
  question: Question;
  isFirstUnanswered: boolean;
}) {
  return (
    <div className="relative group w-full">
      {isFirstUnanswered && <StartBounce />}
      <StudyPathQuestionCard
        href={`/question/${question.slug}`}
        questionData={question}
        className="w-full hover:border-accent group-hover:scale-[0.99] active:scale-[0.98] transition-transform duration-200"
      />
    </div>
  );
}

function StartBounce() {
  return (
    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-full z-20">
      <div className="animate-start-bounce">
        <div className="relative bg-black border-2 border-black-50 text-green-500 px-4 py-2 rounded-lg font-semibold shadow-lg flex items-center group-hover:scale-[0.99] transition-transform duration-200 text-lg">
          <span className="font-onest">Start</span>
          <div className="absolute w-3 h-3 bg-black border-r-2 border-b-2 border-black-50 transform rotate-45 left-1/2 -bottom-1.5 -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
}
