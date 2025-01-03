'use client';

import { useRef, useState } from 'react';
import { BookIcon, BookOpen, FileIcon, FileText } from 'lucide-react';

// components
import Chip from '@/components/ui/chip';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnswerQuestionForm from '@/components/app/questions/single/answer-question-form';
import QuestionCardFooter from '@/components/app/questions/single/question-card-footer';
import Stopwatch from '@/components/app/questions/single/stopwatch';
import QuestionHintAccordion from '@/components/app/questions/single/question-hint';

// utils
import { capitalise, getQuestionDifficultyColor } from '@/utils';

// types
import { UserRecord } from '@/types/User';
import { Question } from '@/types/Questions';

// hooks
import { useStopwatch } from 'react-timer-hook';
import QuestionResourceTab from '@/components/app/questions/question-resource-tab';

export default function QuestionCard(opts: {
  user: UserRecord;
  question: Question;
  nextQuestion?: string;
  isRoadmapQuestion?: boolean;
  index?: number;
}) {
  const { user, question, nextQuestion, isRoadmapQuestion = false } = opts;
  const [activeTab, setActiveTab] = useState<'description' | 'resources'>(
    'description'
  );

  const answerFormRef = useRef<{
    submitForm: () => void;
    resetForm: () => void;
  }>(null);

  const { pause, reset, totalSeconds } = useStopwatch({
    autoStart: true,
  });

  return (
    <div className="col-span-full lg:col-span-6 h-fit bg-black-75 border border-black-50 rounded-xl overflow-hidden">
      <div className="p-4 w-full flex justify-between bg-black-25 items-center">
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
      <div className="h-fit bg-black">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="h-auto grid w-full grid-cols-2 text-white rounded-none bg-transparent p-4">
            <TabsTrigger
              value="description"
              onClick={() => setActiveTab('description')}
            >
              {activeTab === 'description' ? (
                <FileText className="mr-2 size-4" />
              ) : (
                <FileIcon className="mr-2 size-4" />
              )}
              Description
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              onClick={() => setActiveTab('resources')}
            >
              {activeTab === 'resources' ? (
                <BookOpen className="mr-2 size-4" />
              ) : (
                <BookIcon className="mr-2 size-4" />
              )}
              Resources
            </TabsTrigger>
          </TabsList>
          <Separator className="bg-black-50" />
          <TabsContent value="description" className="pt-4">
            {'dailyQuestion' in question && question.dailyQuestion && (
              <h3 className="font-inter text-gray-400 text-sm font-light px-4 pb-2">
                This question is a daily question and will count towards your
                daily streak.
              </h3>
            )}
            {question?.question && (
              <h3 className="font-inter font-light p-4 pt-0 text-base md:text-xl">
                {question.question}
              </h3>
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
          </TabsContent>
          <TabsContent value="resources" className="p-4">
            <h3 className="font-inter font-light text-base md:text-xl">
              Helpful resources for this question
            </h3>
            <QuestionResourceTab resources={question.resources} />
          </TabsContent>
        </Tabs>
      </div>
      <Separator className="bg-black-50" />
      <div className="w-full space-y-4 px-4 bg-black">
        {question.hint && <QuestionHintAccordion hint={question.hint} />}
      </div>
      <Separator className="bg-black-50" />
      <QuestionCardFooter
        questionTags={'tags' in question ? question.tags : []}
        answerFormRef={answerFormRef}
      />
    </div>
  );
}
