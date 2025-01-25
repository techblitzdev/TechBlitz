import QuestionCard from '@/components/app/questions/layout/question-card';
import { useUserServer } from '@/hooks/use-user-server';
import { Answer } from '@/types/Answers';

import { QuestionWithoutAnswers } from '@/types/Questions';
import { Suspense } from 'react';

export default async function StudyPathsList(opts: {
  questions: Promise<QuestionWithoutAnswers[]>;
}) {
  const { questions } = opts;

  const user = await useUserServer();
  const studyPathQuestions = await questions;

  return (
    <div className="space-y-6">
      <Suspense fallback={<div>Loading questions...</div>}>
        {studyPathQuestions.map((question) => (
          <QuestionCard
            key={question.slug}
            questionData={{ ...question, userAnswers: [] }}
            identifier="slug"
            user={user || null}
          />
        ))}
      </Suspense>
    </div>
  );
}
