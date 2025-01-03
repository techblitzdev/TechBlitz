'use client';

import { useRef, useState } from 'react';
import { BookOpen, FileText } from 'lucide-react';

import Chip from '@/components/ui/chip';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnswerQuestionForm from './answer-question-form';
import QuestionCardFooter from './question-card-footer';
import Stopwatch from './stopwatch';

import { capitalise, getQuestionDifficultyColor } from '@/utils';

import { UserRecord } from '@/types/User';
import { Question } from '@/types/Questions';
import { useStopwatch } from 'react-timer-hook';

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
      <div className="h-fit bg-[#000000]">
        {'dailyQuestion' in question && question.dailyQuestion && (
          <div className="p-4">
            <h3 className="font-inter text-gray-400 text-xs font-light">
              This question is a daily question and will count towards your
              daily streak.
            </h3>
          </div>
        )}
        <Tabs defaultValue="description" className="w-full p-4">
          <TabsList className="grid w-full grid-cols-2 text-white bg-[#000]">
            <TabsTrigger
              value="description"
              onClick={() => setActiveTab('description')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Description
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              onClick={() => setActiveTab('resources')}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="px-4 py-4">
            {question?.question && (
              <h3 className="font-inter font-light">{question.question}</h3>
            )}
          </TabsContent>
          <TabsContent value="resources" className="px-4 py-4">
            <h3 className="font-inter font-light">
              Helpful resources for this question:
            </h3>
            <ul className="list-disc list-inside mt-2">
              <li>
                <a href="#" className="text-accent hover:underline">
                  Resource 1
                </a>
              </li>
              <li>
                <a href="#" className="text-accent hover:underline">
                  Resource 2
                </a>
              </li>
              <li>
                <a href="#" className="text-accent hover:underline">
                  Resource 3
                </a>
              </li>
            </ul>
          </TabsContent>
        </Tabs>

        {activeTab === 'description' && (
          <AnswerQuestionForm
            ref={answerFormRef}
            userData={user}
            question={question}
            stopwatchPause={pause}
            time={totalSeconds}
            nextQuestion={nextQuestion}
            resetStopwatch={reset}
          />
        )}
      </div>
      <Separator className="bg-black-50" />
      <QuestionCardFooter
        questionTags={'tags' in question ? question.tags : []}
        answerFormRef={answerFormRef}
      />
    </div>
  );
}
