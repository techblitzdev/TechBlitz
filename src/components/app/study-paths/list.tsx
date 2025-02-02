import QuestionCard from '@/components/app/questions/layout/question-card';
import { useUserServer } from '@/hooks/use-user-server';
import { cn } from '@/lib/utils';

import { Question } from '@/types/Questions';
import type { StudyPath } from '@/utils/constants/study-paths';
import { Suspense } from 'react';

export default async function StudyPathsList(opts: {
  questions: Promise<Question[]>;
  studyPath: StudyPath;
}) {
  const { questions, studyPath } = opts;

  const user = await useUserServer();
  const studyPathQuestions = await questions;

  // Sort questions to match study path order
  const sortedQuestions = studyPath.questionSlugs
    .map((slug) => studyPathQuestions.find((q) => q.slug === slug))
    .filter((q): q is Question => q !== undefined);

  // find the earliest question in the roadmap the user has not answered
  //const earliestQuestionSlug = sortedQuestions.

  return (
    <div className="relative min-h-[800px]">
      <Suspense fallback={<div>Loading questions...</div>}>
        <div className="relative z-10">
          {sortedQuestions.map((question, index) => {
            // Create a smooth sine wave pattern
            const offset = Math.sin(index * 0.9) * 7;

            return (
              <div
                key={question.slug}
                className={cn('absolute w-full flex justify-center transition-all duration-300')}
                style={{
                  top: `${index * 120}px`,
                  transform: `translateX(${offset}%)`,
                }}
              >
                <QuestionCard
                  questionData={question}
                  identifier="slug"
                  user={user || null}
                  numberOfTags={0}
                  type="study-path"
                  showSubmissions={false}
                  studyPathSlug={studyPath.slug}
                  className="w-[80%] hover:border-accent hover:scale-[0.99] active:scale-[0.98] transition-transform duration-200"
                />
              </div>
            );
          })}
        </div>
      </Suspense>
    </div>
  );
}
