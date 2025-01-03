'use client';

import { useState, ReactNode } from 'react';
import { BookIcon, BookOpen, FileIcon, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Question } from '@/types/Questions';
import QuestionResourceTab from '@/components/app/questions/resources/question-resource-tab';

interface QuestionTabsProps {
  question: Question;
  renderAnswerForm: () => ReactNode;
}

export default function QuestionTabs({
  question,
  renderAnswerForm,
}: QuestionTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'resources'>(
    'description'
  );

  return (
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
        <h3 className="font-inter font-light text-base md:text-xl">
          Helpful resources for this question
        </h3>
        <QuestionResourceTab resources={question.QuestionResources} />
      </TabsContent>
    </Tabs>
  );
}
