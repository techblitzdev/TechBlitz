'use client';

import { ReactNode, use, useState } from 'react';
import { TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { Question } from '@/types/Questions';
import QuestionResourceTab from '@/components/app/questions/resources/question-resource-tab';
import QuestionStatsTab from './question-stats-tab';
import CodingChallengeDescription from '@/components/app/questions/code-editor/description-tab';
import HasAnswered from '../single/has-answered';
import { useQuestionSingle } from '../single/layout/question-single-context';
import BookmarkQuestion from '../single/bookmark';
import { capitalise } from '@/utils';
import Chip from '@/components/ui/chip';
import { getQuestionDifficultyColor } from '@/utils';
import ShareQuestion from '@/components/global/share-question';
import { BarChart, BookIcon, PieChart } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { FileIcon, FileText } from 'lucide-react';
import QuestionHintTrigger from '../question-hint-trigger';

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
  const { userAnswered } = useQuestionSingle();

  const [activeTab, setActiveTab] = useState<
    'description' | 'resources' | 'stats'
  >('description');

  const hasUserAnswered = use(userAnswered);

  return (
    <>
      <TabsList className="p-4 grid lg:hidden h-auto w-full place-items-center grid-cols-3 gap-5 text-white rounded-lg bg-transparent">
        <TabsTrigger
          value="description"
          onClick={() => setActiveTab('description')}
          className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
        >
          <div className="mr-2 hidden md:block">
            {activeTab === 'description' ? (
              <FileText className="size-4" />
            ) : (
              <FileIcon className="size-4" />
            )}
          </div>
          Description
        </TabsTrigger>
        <TabsTrigger
          value="resources"
          onClick={() => setActiveTab('resources')}
          className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
        >
          <div className="mr-2 hidden md:block">
            {activeTab === 'resources' ? (
              <BookOpen className="size-4" />
            ) : (
              <BookIcon className="size-4" />
            )}
          </div>
          Resources
        </TabsTrigger>
        <TabsTrigger
          value="stats"
          onClick={() => setActiveTab('stats')}
          className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
        >
          <div className="mr-2 hidden md:block">
            {activeTab === 'stats' ? (
              <BarChart className="size-4" />
            ) : (
              <PieChart className="size-4" />
            )}
          </div>
          Stats
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="pt-2 lg:pt-4">
        {question.questionType === 'CODING_CHALLENGE' ? (
          <CodingChallengeDescription question={question} />
        ) : (
          <div className="flex flex-col gap-4 p-4 pt-0">
            <div className="flex w-full justify-between gap-5 mb-5">
              <div className="flex w-full gap-2 items-center">
                <Chip
                  color={getQuestionDifficultyColor(question.difficulty).bg}
                  text={capitalise(question.difficulty)}
                  textColor={
                    getQuestionDifficultyColor(question.difficulty).text
                  }
                  border={
                    getQuestionDifficultyColor(question.difficulty).border
                  }
                />
                <HasAnswered userAnswered={hasUserAnswered} />
              </div>
              <div className="flex items-center">
                <QuestionHintTrigger />
                <ShareQuestion />
                <BookmarkQuestion question={question} />
              </div>
            </div>
            {question?.title && (
              <div className="flex w-full gap-10 justify-between">
                <h3 className="font-onest font-light text-lg md:text-2xl">
                  {question.title}
                </h3>
              </div>
            )}
            <p className="text-sm text-gray-400 font-light font-onest mt-3">
              {question.question}
            </p>
            {renderAnswerForm()}
          </div>
        )}
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
    </>
  );
}
