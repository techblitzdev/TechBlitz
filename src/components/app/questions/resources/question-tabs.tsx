'use client';

import { useState, ReactNode } from 'react';
import {
  BarChart,
  BookIcon,
  BookOpen,
  FileIcon,
  FileText,
  PieChart,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Question } from '@/types/Questions';
import QuestionResourceTab from '@/components/app/questions/resources/question-resource-tab';
import QuestionStatsTab from './question-stats-tab';
import { cn } from '@/lib/utils';
import { useQuestionSingle } from '../single/layout/question-single-context';

interface QuestionTabsProps {
  question: Question;
  renderAnswerForm: () => ReactNode;
  totalSubmissions?: {
    totalSubmissions: number;
    percentageCorrect: number;
  };
}

export default function QuestionTabs({
  question,
  renderAnswerForm,
  totalSubmissions,
}: QuestionTabsProps) {
  const [activeTab, setActiveTab] = useState<
    'description' | 'resources' | 'stats'
  >('description');

  return (
    <Tabs defaultValue="description" className={cn('w-full relative')}>
      <TabsList className="h-auto grid w-full grid-cols-3 text-white rounded-none bg-transparent p-2 lg:p-4">
        <TabsTrigger
          value="description"
          onClick={() => setActiveTab('description')}
        >
          <div className="hidden lg:block">
            {activeTab === 'description' ? (
              <FileText className="mr-2 size-4" />
            ) : (
              <FileIcon className="mr-2 size-4" />
            )}
          </div>
          Description
        </TabsTrigger>
        <TabsTrigger
          value="resources"
          onClick={() => setActiveTab('resources')}
        >
          <div className="hidden lg:block">
            {activeTab === 'resources' ? (
              <BookOpen className="mr-2 size-4" />
            ) : (
              <BookIcon className="mr-2 size-4" />
            )}
          </div>
          Resources
        </TabsTrigger>
        <TabsTrigger value="stats" onClick={() => setActiveTab('stats')}>
          <div className="hidden lg:block">
            {activeTab === 'stats' ? (
              <BarChart className="mr-2 size-4" />
            ) : (
              <PieChart className="mr-2 size-4" />
            )}
          </div>
          Stats
        </TabsTrigger>
      </TabsList>
      <Separator className="bg-black-50" />
      <TabsContent value="description" className="pt-2 lg:pt-4">
        {'dailyQuestion' in question && question.dailyQuestion && (
          <h3 className="font-inter text-gray-400 text-sm font-light px-4 pb-2">
            This question is a daily question and will count towards your daily
            streak.
          </h3>
        )}
        {question?.question && (
          <h3 className="font-inter font-light p-4 pt-0 text-base md:text-xl">
            {question.question}
          </h3>
        )}
        {renderAnswerForm()}
      </TabsContent>
      <TabsContent value="resources" className="p-4">
        <h3 className="font-inter font-light text-lg md:text-2xl">
          A list of helpful resources to help you answer this question.
        </h3>
        <QuestionResourceTab
          resources={question.QuestionResources}
          reference={question.slug || undefined}
        />
      </TabsContent>
      <TabsContent value="stats" className="p-4">
        <QuestionStatsTab totalSubmissions={totalSubmissions} />
      </TabsContent>
    </Tabs>
  );
}
