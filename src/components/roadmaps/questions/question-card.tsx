'use client';
import { useRef } from 'react';

import Chip from '@/components/global/chip';
import { Separator } from '@/components/ui/separator';

import { capitalise, getQuestionDifficultyColor } from '@/utils';

import { UserRecord } from '@/types/User';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import { Button } from '../../ui/button';
import RoadmapAnswerQuestionForm from '../questions/roadmap-answer-form';

export default function RoadmapQuestionCard(opts: {
  user: UserRecord;
  question: RoadmapUserQuestions;
  roadmapUid: string;
  isDefaultQuestion: boolean;
}) {
  const { user, question, roadmapUid, isDefaultQuestion } = opts;

  const answerFormRef = useRef<{ submitForm: () => void }>(null);

  return (
    <div className="col-span-full lg:col-span-6 h-fit bg-black-75 border border-black-50 rounded-xl overflow-hidden">
      <div className="p-4 w-full flex justify-between bg-black-25">
        <Chip
          color={getQuestionDifficultyColor(question.difficulty)}
          text={capitalise(question.difficulty)}
          textColor={getQuestionDifficultyColor(question.difficulty)}
          ghost
        />
      </div>
      <Separator className="bg-black-50" />
      <div className="h-fit bg-black-100">
        {question?.question && (
          <div className="pt-4 px-4">
            <h3 className="font-inter font-light">{question.question}</h3>
          </div>
        )}
        <RoadmapAnswerQuestionForm
          ref={answerFormRef}
          question={question}
          userData={user}
          roadmapUid={roadmapUid}
        />
      </div>
      <Separator className="bg-black-50" />
      <div className="p-4 w-full flex justify-between items-center">
        <div className="flex items-center gap-4 self-end">
          <Button variant="destructive">Reset</Button>
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
