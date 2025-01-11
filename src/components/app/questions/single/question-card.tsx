'use client';

import { useRef } from 'react';

// components
import Chip from '@/components/ui/chip';
import { Separator } from '@/components/ui/separator';
import QuestionCardFooter from '@/components/app/questions/single/question-card-footer';
import Stopwatch from '@/components/app/questions/single/stopwatch';
import QuestionHintAccordion from '@/components/app/questions/single/question-hint';
import QuestionTabs from '@/components/app/questions/resources/question-tabs';
import AnswerQuestionForm from '@/components/app/questions/single/answer-question-form';

// utils
import { capitalise, getQuestionDifficultyColor } from '@/utils';

// types
import { UserRecord } from '@/types/User';
import { Question } from '@/types/Questions';

import { useQuestionSingle } from './layout/question-single-context';

export default function QuestionCard(opts: {
  // optional as this is not required to render the card
  user: UserRecord | null;
  question: Question;
  totalSubmissions?: {
    totalSubmissions: number;
    percentageCorrect: number;
  };
  nextQuestion?: string;
  isRoadmapQuestion?: boolean;
  index?: number;
  identifier: 'slug' | 'uid';
}) {
  const {
    user,
    question,
    nextQuestion,
    isRoadmapQuestion = false,
    totalSubmissions,
  } = opts;

  const { pause, reset, totalSeconds } = useQuestionSingle();

  const answerFormRef = useRef<{
    submitForm: () => void;
    resetForm: () => void;
  }>(null);

  const renderAnswerForm = () => (
    <AnswerQuestionForm
      stopwatchPause={pause}
      time={totalSeconds}
      nextQuestion={nextQuestion}
      resetStopwatch={reset}
    />
  );

  return (
    <div className="min-h-fit lg:min-h-[45rem] bg-black-75 border border-black-50 rounded-xl flex flex-col overflow-hidden">
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
        {user && user?.showTimeTaken && !isRoadmapQuestion && (
          <Stopwatch totalSeconds={totalSeconds} />
        )}
      </div>
      <Separator className="bg-black-50" />
      <div className="flex-1 bg-black">
        <QuestionTabs
          question={question}
          renderAnswerForm={renderAnswerForm}
          totalSubmissions={totalSubmissions}
        />
      </div>
      <Separator className="bg-black-50" />
      <div className="w-full space-y-4 px-4 bg-black">
        {question.hint && <QuestionHintAccordion hint={question.hint} />}
      </div>
      <Separator className="bg-black-50" />
      <QuestionCardFooter
        questionTags={'tags' in question ? question.tags : []}
        answerFormRef={answerFormRef}
        user={user}
        redirectUrl={`/question/${question.slug}`}
      />
    </div>
  );
}
