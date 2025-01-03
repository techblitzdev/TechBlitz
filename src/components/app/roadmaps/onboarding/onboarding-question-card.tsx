'use client';
import { useRef } from 'react';

import Chip from '@/components/ui/chip';
import { Separator } from '@/components/ui/separator';

import { capitalise, getQuestionDifficultyColor } from '@/utils';

import { UserRecord } from '@/types/User';
import { DefaultRoadmapQuestions } from '@/types/Roadmap';
import OnboardingRoadmapAnswerQuestionForm from '@/components/app/roadmaps/onboarding/onboarding-answer-form';
import { Button } from '@/components/ui/button';

export default function OnboardingQuestionCard(opts: {
  user: UserRecord;
  question: DefaultRoadmapQuestions;
  roadmapUid: string;
}) {
  const { user, question, roadmapUid } = opts;

  const answerFormRef = useRef<{
    submitForm: () => void;
    resetForm: () => void;
  }>(null);

  return (
    <div className="col-span-full lg:col-span-6 h-fit bg-black-75 border border-black-50 rounded-xl overflow-hidden">
      <div className="p-4 w-full flex justify-between bg-black-25 items-center">
        <Chip
          color={getQuestionDifficultyColor(question.difficulty).bg}
          text={capitalise(question.difficulty)}
          textColor={getQuestionDifficultyColor(question.difficulty).text}
          border={getQuestionDifficultyColor(question.difficulty).border}
        />
        <a href="#code-snippet" className="text-xs block md:hidden">
          (Tap to see code snippet)
        </a>
      </div>
      <Separator className="bg-black-50" />
      <div className="h-fit bg-black-100">
        {question?.question && (
          <div className="pt-4 px-4">
            <h3 className="font-inter font-light">{question.question}</h3>
          </div>
        )}
        <OnboardingRoadmapAnswerQuestionForm
          ref={answerFormRef}
          question={question}
          userData={user}
          roadmapUid={roadmapUid}
        />
      </div>
      <Separator className="bg-black-50" />
      <div className="p-4 w-full flex justify-between items-center">
        <div className="flex items-center gap-4 self-end">
          <Button
            variant="destructive"
            onClick={() => answerFormRef.current?.resetForm()}
          >
            Reset
          </Button>
          <Button
            variant="accent"
            onClick={() => answerFormRef.current?.submitForm()}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
