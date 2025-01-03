'use client';
import { useRef } from 'react';

import Chip from '@/components/ui/chip';
import { Separator } from '@/components/ui/separator';
import AnswerQuestionForm from './answer-question-form';
import QuestionCardFooter from './question-card-footer';
import Stopwatch from '@/components/app/questions/single/stopwatch';

import { capitalise, getQuestionDifficultyColor } from '@/utils';

import { Question } from '@/types/Questions';
import { useStopwatch } from 'react-timer-hook';
import QuestionTabs from '@/components/app/questions/resources/question-tabs';

export default function QuestionCard(opts: {
  question: Question;
  index?: number;
}) {
  const { question } = opts;

  const answerFormRef = useRef<{ submitForm: () => void }>(null);
  const { seconds, totalSeconds } = useStopwatch({
    autoStart: true,
  });

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
          (Code snippet)
        </a>
        <Stopwatch totalSeconds={totalSeconds} />
      </div>
      <Separator className="bg-black-50" />
      <div className="h-fit bg-black-100">
        <QuestionTabs
          question={question}
          renderAnswerForm={() => (
            <AnswerQuestionForm
              ref={answerFormRef}
              question={question}
              seconds={seconds}
            />
          )}
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
