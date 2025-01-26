import QuestionCard from '@/components/app/questions/layout/question-card';
import { useUserServer } from '@/hooks/use-user-server';

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

  return (
    <div className="space-y-6">
      <Suspense fallback={<div>Loading questions...</div>}>
        {sortedQuestions.map((question) => (
          <>
            <QuestionCard
              key={question.slug}
              questionData={question}
              identifier="slug"
              user={user || null}
              numberOfTags={3}
              type="study-path"
              showSubmissions={false}
            />
          </>
        ))}
      </Suspense>
    </div>
  );
}
