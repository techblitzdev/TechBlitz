import QuestionCard from '@/components/marketing/question/question-card';
import { Question } from '@/types/Questions';
import { use } from 'react';

export default function StudyPathsList(opts: {
  questions: Promise<Question[]>;
}) {
  const { questions } = opts;

  const studyPathQuestions = use(questions);

  return (
    <>
      {studyPathQuestions.map((question) => (
        <QuestionCard key={question.uid} question={question} />
      ))}
    </>
  );
}
