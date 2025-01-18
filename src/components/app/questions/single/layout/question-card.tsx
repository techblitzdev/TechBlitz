'use client';

import { use, useRef } from 'react';

// components
import Chip from '@/components/ui/chip';
import { Separator } from '@/components/ui/separator';
import QuestionCardFooter from '@/components/app/questions/single/layout/question-card-footer';
import Stopwatch from '@/components/app/questions/single/stopwatch';
import QuestionHintAccordion from '@/components/app/questions/single/question-hint';
import QuestionTabs from '@/components/app/questions/resources/question-tabs';
import AnswerQuestionForm from '@/components/app/questions/single/answer-question-form';

// utils
import { capitalise, getQuestionDifficultyColor } from '@/utils';

// types
import { UserRecord } from '@/types/User';
import { Question } from '@/types/Questions';

import { useQuestionSingle } from './question-single-context';
import { Button } from '@/components/ui/button';
import CodeDisplay from './code-snippet';
import ExpandedCodeModal from './expanded-code-modal';
import ChangeCodeTheme from './change-code-theme';
import AiQuestionHelp from './ai-question-help';
import NoDailyQuestion from '@/components/global/no-daily-question';
import QuestionSubmitted from './question-submitted';
import { capitalize } from 'lodash';
import { AnimatePresence } from 'framer-motion';
import CodeEditorQuestionSubmitted from '@/components/app/code-editor/answer-submitted';

export default function QuestionCard(opts: {
  // optional as this is not required to render the card
  user: UserRecord | null;
  questionPromise: Promise<Question | null>;
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
    questionPromise,
    isRoadmapQuestion = false,
    totalSubmissions,
  } = opts;

  const question = use(questionPromise);

  const {
    totalSeconds,
    currentLayout,
    setCurrentLayout,
    prefilledCodeSnippet,
    answerHelp,
  } = useQuestionSingle();

  const answerFormRef = useRef<{
    submitForm: () => void;
    resetForm: () => void;
  }>(null);

  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }

  const renderAnswerForm = () => <AnswerQuestionForm time={totalSeconds} />;

  // toggle layout only between questions and codeSnippet
  // the answer is after the user has submitted their answer
  const toggleLayout = () => {
    setCurrentLayout(
      currentLayout === 'questions' ? 'codeSnippet' : 'questions'
    );
  };

  return (
    <div className="h-full bg-black-75 border border-black-50 rounded-xl flex flex-col overflow-hidden">
      <div className="p-2 lg:p-4 w-full flex flex-col gap-2 md:flex-row justify-between bg-black-25 md:items-center">
        <div className="flex items-center gap-2 justify-between">
          <div className="w-fit">
            <Chip
              color={getQuestionDifficultyColor(question.difficulty).bg}
              text={capitalise(question.difficulty)}
              textColor={getQuestionDifficultyColor(question.difficulty).text}
              border={getQuestionDifficultyColor(question.difficulty).border}
            />
          </div>
          <div className="flex lg:hidden text-sm w-full items-center justify-end bg-black-25 gap-x-3">
            {/** explain question ai button */}
            <AiQuestionHelp question={question} user={user} />
            {/** code theme selector */}
            <ChangeCodeTheme user={user} />
            {/** code snippet */}
            {question.codeSnippet && (
              <ExpandedCodeModal code={question.codeSnippet} />
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <Button
            variant="ghost"
            onClick={toggleLayout}
            className="text-xs block lg:hidden"
            padding="none"
          >
            {currentLayout === 'questions'
              ? '(Tap to view code snippet)'
              : '(Tap to view question)'}
          </Button>
          {user && user?.showTimeTaken && !isRoadmapQuestion && (
            <Stopwatch totalSeconds={totalSeconds} />
          )}
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="flex-1 bg-black overflow-y-auto scrollable-element">
        {currentLayout === 'questions' && (
          <QuestionTabs
            question={question}
            renderAnswerForm={renderAnswerForm}
            totalSubmissions={totalSubmissions}
          />
        )}
        {currentLayout === 'codeSnippet' &&
          question.codeSnippet &&
          !answerHelp && (
            <CodeDisplay
              content={prefilledCodeSnippet || question.codeSnippet}
              user={user}
            />
          )}
        {answerHelp && currentLayout === 'codeSnippet' && (
          <AnimatePresence mode="wait">
            <div className="flex flex-col gap-y-4 p-4">
              <h2 className="text-lg font-bold">Answer Help</h2>
              {Object.entries(answerHelp).map(([key, value], index) => (
                <div key={index}>
                  <h3 className="text-md font-bold underline">
                    {capitalize(key.replace(/-/g, ' '))}
                  </h3>
                  <p className="text-gray-200">{value.replace(/```/g, '')}</p>
                </div>
              ))}
            </div>
          </AnimatePresence>
        )}
        {currentLayout === 'answer' && (
          <>
            {question.questionType === 'CODING_CHALLENGE' ? (
              <CodeEditorQuestionSubmitted />
            ) : (
              <QuestionSubmitted />
            )}
          </>
        )}
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
