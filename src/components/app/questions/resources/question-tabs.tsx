'use client';

import { useState, ReactNode, use } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Question } from '@/types/Questions';
import QuestionResourceTab from '@/components/app/questions/resources/question-resource-tab';
import QuestionStatsTab from './question-stats-tab';
import { cn } from '@/lib/utils';
import CodingChallengeDescription from '../../code-editor/description-tab';
import HasAnswered from '../single/has-answered';
import { useQuestionSingle } from '../single/layout/question-single-context';
import BookmarkQuestion from '../single/bookmark';
import { capitalise } from '@/utils';
import Chip from '@/components/ui/chip';
import { getQuestionDifficultyColor } from '@/utils';
import Stopwatch from '../single/stopwatch';
import { ShareIcon } from 'lucide-react';
import ShareQuestion from '@/components/global/share-question';
import { Button } from '@/components/ui/button';

interface QuestionTabsProps {
  question: Question;
  renderAnswerForm: () => ReactNode;
  totalSubmissions?: {
    totalSubmissions: number;
    percentageCorrect: number;
  };
  activeTab: 'description' | 'resources' | 'stats';
}

export default function QuestionTabs({
  question,
  renderAnswerForm,
  totalSubmissions,
  activeTab,
}: QuestionTabsProps) {
  const { userAnswered, user, totalSeconds } = useQuestionSingle();

  const hasUserAnswered = use(userAnswered);

  return (
    <>
      <Separator className="bg-black-50" />
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
                <ShareQuestion />
                <BookmarkQuestion />
              </div>
            </div>
            {question?.question && (
              <div className="flex w-full gap-10 justify-between">
                <h3 className="font-onest font-light text-base md:text-xl">
                  {question.question}
                </h3>
              </div>
            )}
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
