import type { Question } from '@/types/Questions';
import type { StudyPath } from '@/utils/constants/study-paths';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import StudyPathQuestionCard from './study-path-question-card';

const QuestionCardClient = dynamic(() => import('../questions/layout/question-card-client'), {
  ssr: false,
});

export default async function StudyPathsList(opts: {
  questions: Promise<Question[]>;
  studyPath: StudyPath;
}) {
  const { questions, studyPath } = opts;

  const studyPathQuestions = await questions;

  // Sort questions to match study path order
  const sortedQuestions = studyPath.questionSlugs
    .map((slug) => studyPathQuestions.find((q) => q.slug === slug))
    .filter((q): q is Question => q !== undefined);

  // find the earliest question in the roadmap the user has not answered
  // this can also be the first question the user has got incorrect, whichever
  // comes first
  const firstUnansweredQuestion = sortedQuestions.find(
    (q) => !q.userAnswers?.length || q.userAnswers?.some((answer) => answer.correctAnswer === false)
  )?.slug;

  return (
    <div className="relative min-h-[800px]">
      <Suspense fallback={<div>Loading questions...</div>}>
        <div className="relative w-full">
          <div className="relative z-10">
            {sortedQuestions.map((question, index) => {
              // Create a gentler sine wave pattern
              const offset = Math.sin(index * 0.9) * 4;

              return (
                <QuestionCardClient
                  key={question.slug}
                  questionData={question}
                  index={index}
                  offset={offset}
                >
                  <div className="relative group w-full">
                    {firstUnansweredQuestion === question.slug && (
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-full z-20">
                        <div className="animate-start-bounce">
                          <div className="relative bg-black border-2 border-black-50 text-green-500 px-4 py-2 rounded-lg font-semibold shadow-lg flex items-center group-hover:scale-[0.99] transition-transform duration-200 text-lg">
                            <span className="font-onest">Start</span>
                            <div className="absolute w-3 h-3 bg-black border-r-2 border-b-2 border-black-50 transform rotate-45 left-1/2 -bottom-1.5 -translate-x-1/2"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <StudyPathQuestionCard
                      href={`/question/${question.slug}`}
                      questionData={question}
                      className="w-full hover:border-accent group-hover:scale-[0.99] active:scale-[0.98] transition-transform duration-200"
                    />
                  </div>
                </QuestionCardClient>
              );
            })}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
