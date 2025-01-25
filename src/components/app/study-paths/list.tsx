import QuestionCard from '@/components/app/questions/layout/question-card';
import { useUserServer } from '@/hooks/use-user-server';

import { QuestionWithoutAnswers } from '@/types/Questions';
import { StudyPath } from '@/utils/constants/study-paths';
import { Suspense } from 'react';

export default async function StudyPathsList(opts: {
  questions: Promise<QuestionWithoutAnswers[]>;
  studyPath: StudyPath;
}) {
  const { questions, studyPath } = opts;

  const user = await useUserServer();
  const studyPathQuestions = await questions;

  // Sort questions to match study path order
  const sortedQuestions = studyPath.questionUids
    .map((uid) => studyPathQuestions.find((q) => q.uid === uid))
    .filter((q): q is QuestionWithoutAnswers => q !== undefined);

  return (
    <div className="space-y-6">
      <Suspense fallback={<div>Loading questions...</div>}>
        {sortedQuestions.map((question) => (
          <QuestionCard
            key={question.slug}
            questionData={{
              ...question,
              userAnswers: [],
            }}
            identifier="slug"
            user={user || null}
            numberOfTags={3}
          />
        ))}
      </Suspense>
    </div>
  );
}
