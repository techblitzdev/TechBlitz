'use client';

import QuestionCodeDisplay from '@/components/app/shared/question/question-code-display';
import { useRoadmapOnboardingContext } from './roadmap-onboarding-context';

export default function OnboardingCodeDisplayWrapper() {
  const { question, user, answerHelp } = useRoadmapOnboardingContext();

  return <QuestionCodeDisplay question={question} user={user} answerHelp={answerHelp} />;
}
