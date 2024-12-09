'use client';
import { useRef } from 'react';

import Chip from '@/components/global/chip';
import { Separator } from '@/components/ui/separator';
import AnswerQuestionForm from './answer-question-form';
import QuestionCardFooter from './question-card-footer';
import Stopwatch from '@/components/questions/single/stopwatch';

import { capitalise, getQuestionDifficultyColor } from '@/utils';

import { Question } from '@/types/Questions';
import { cn } from '@/utils/cn';
import { useStopwatch } from 'react-timer-hook';

export default function QuestionCard(opts: {
  question: Question;
  index?: number;
}) {
  const { question } = opts;

  const answerFormRef = useRef<{ submitForm: () => void }>(null);
  const { seconds, pause, reset, totalSeconds } = useStopwatch({
    autoStart: true
  });

  return (
    <div className="col-span-full lg:col-span-6 h-fit bg-black-75 border border-black-50 rounded-xl overflow-hidden">
      <div className="p-4 w-full flex justify-between bg-black-25">
        <Chip
          color={getQuestionDifficultyColor(question.difficulty)}
          text={capitalise(question.difficulty)}
          textColor={getQuestionDifficultyColor(question.difficulty)}
          ghost
        />
        <Stopwatch totalSeconds={totalSeconds} />
      </div>
      <Separator className="bg-black-50" />
      <div className="h-fit bg-black-100">
        {question?.question && (
          <div
            className={cn(
              'p-4',
              'dailyQuestion' in question && !question.dailyQuestion && 'pt-4'
            )}
          >
            <h3 className="font-inter font-light">{question.question}</h3>
          </div>
        )}

        <AnswerQuestionForm
          ref={answerFormRef}
          question={question}
          seconds={seconds}
        />
      </div>
      <Separator className="bg-black-50" />
      <QuestionCardFooter
        questionTags={'tags' in question ? question.tags : []}
        answerFormRef={answerFormRef}
      />
    </div>
  );
}
