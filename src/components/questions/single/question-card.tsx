'use client';
import { useRef } from 'react';

import Chip from '@/components/global/chip';
import { Separator } from '@/components/ui/separator';
import AnswerQuestionForm from './answer-question-form';
import QuestionCardFooter from './question-card-footer';
import Stopwatch from './stopwatch';

import { capitalise, getQuestionDifficultyColor } from '@/utils';

import { UserRecord } from '@/types/User';
import { Question } from '@/types/Questions';

export default function QuestionCard(opts: {
  user: UserRecord;
  question: Question;
}) {
  const { user, question } = opts;

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
        {user?.showTimeTaken && <Stopwatch />}
      </div>
      <Separator className="bg-black-50" />
      <div className="h-fit bg-black-100">
        {question.dailyQuestion && (
          <div className="p-4">
            <h3 className="font-inter text-gray-400 text-xs font-light">
              This question is a daily question and will count towards your
              daily streak.
            </h3>
          </div>
        )}
        {question?.question && (
          <div className="px-4">
            <h3 className="font-inter font-light">{question.question}</h3>
          </div>
        )}

        <AnswerQuestionForm
          ref={answerFormRef}
          userData={user}
          question={question}
        />
      </div>
      <Separator className="bg-black-50" />
      {question.tags && (
        <QuestionCardFooter
          questionTags={question.tags}
          answerFormRef={answerFormRef}
        />
      )}
    </div>
  );
}
