'use client';
import QuestionTabs from '@/components/app/shared/question-tabs';
import { DefaultRoadmapQuestions } from '@prisma/client';
import { FileText } from 'lucide-react';
import QuestionAccordion from '../../questions/single/question-accordion';
import OnboardingRoadmapAnswerQuestionForm from './onboarding-answer-form';

export default function OnboardingQuestionCard({
  question,
  showHint,
}: {
  question: DefaultRoadmapQuestions;
  showHint: boolean;
}) {
  const descriptionContent = () => {
    return (
      <div className="">
        <OnboardingRoadmapAnswerQuestionForm />
      </div>
    );
  };

  const footerContent = question.hint && (
    <QuestionAccordion
      hint={question.hint}
      showHint={showHint}
      showRelatedQuestions={false}
    />
  );

  return (
    <QuestionTabs
      tabs={[
        {
          value: 'description',
          label: 'Description',
          content: descriptionContent(),
          icon: <FileText className="size-4" />,
          activeIcon: <FileText className="size-4" />,
        },
      ]}
      footerContent={footerContent}
    />
  );
}
