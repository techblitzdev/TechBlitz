'use client';

import QuestionCodeDisplay from '@/components/app/shared/question/question-code-display';
import { useRoadmapQuestion } from '@/contexts/roadmap-question-context';

export default function QuestionCodeDisplayWrapper() {
  const { roadmapQuestion, user, answerHelp } = useRoadmapQuestion();

  return <QuestionCodeDisplay question={roadmapQuestion} user={user} answerHelp={answerHelp} />;
}
