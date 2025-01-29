'use client';
import QuestionTabs from '@/components/app/shared/question-tabs';
import { DefaultRoadmapQuestions } from '@prisma/client';
import { FileText } from 'lucide-react';
import QuestionAccordion from '../../questions/single/question-accordion';

export default function OnboardingQuestionCard({
  question,
  showHint,
  roadmapUid,
}: {
  question: DefaultRoadmapQuestions;
  showHint: boolean;
  roadmapUid: string;
}) {
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
          content: <div>Description</div>,
          icon: <FileText className="size-4" />,
          activeIcon: <FileText className="size-4" />,
        },
      ]}
      footerContent={footerContent}
    />
  );
}
