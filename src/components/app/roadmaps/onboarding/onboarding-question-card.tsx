'use client';
import QuestionTabs from '@/components/app/shared/question-tabs';
import { FileText } from 'lucide-react';

export default function OnboardingQuestionCard() {
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
    />
  );
}
