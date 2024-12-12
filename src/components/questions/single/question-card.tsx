'use client';
import { useRef } from 'react';

import Chip from '@/components/ui/chip';
import { Separator } from '@/components/ui/separator';
import AnswerQuestionForm from './answer-question-form';
import QuestionCardFooter from './question-card-footer';
import Stopwatch from './stopwatch';

import { capitalise, getQuestionDifficultyColor } from '@/utils';

import { UserRecord } from '@/types/User';
import { Question } from '@/types/Questions';
import { cn } from '@/utils/cn';
import { useStopwatch } from 'react-timer-hook';
import { DefaultRoadmapQuestions } from '@/types/Roadmap';

export default function QuestionCard(opts: {
  user: UserRecord;
  question: Question;
  nextQuestion?: string;
  isRoadmapQuestion?: boolean;
  index?: number;
}) {
  const {
    user,
    question,
    nextQuestion,
    isRoadmapQuestion = false,
    index
  } = opts;

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
        {user?.showTimeTaken && !isRoadmapQuestion && (
          <Stopwatch totalSeconds={totalSeconds} />
        )}
      </div>
      <Separator className="bg-black-50" />
      <div className="h-fit bg-black-100">
        {'dailyQuestion' in question && question.dailyQuestion && (
          <div className="p-4">
            <h3 className="font-inter text-gray-400 text-xs font-light">
              This question is a daily question and will count towards your
              daily streak.
            </h3>
          </div>
        )}
        {question?.question && (
          <div
            className={cn(
              'px-4',
              'dailyQuestion' in question && !question.dailyQuestion && 'pt-4',
              isRoadmapQuestion && 'pt-4'
            )}
          >
            <h3 className="font-inter font-light">{question.question}</h3>
          </div>
        )}

        <AnswerQuestionForm
          ref={answerFormRef}
          userData={user}
          question={question}
          stopwatchPause={pause}
          time={totalSeconds}
          nextQuestion={nextQuestion}
          resetStopwatch={reset}
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
