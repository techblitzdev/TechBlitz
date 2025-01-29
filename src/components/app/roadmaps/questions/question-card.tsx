'use client';
import { useState } from 'react';

import { UserRecord } from '@/types/User';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AiQuestionHelp from '@/components/app/questions/single/layout/ai-question-help';
import ChangeCodeTheme from '@/components/app/questions/single/layout/change-code-theme';
import ExpandedCodeModal from '@/components/app/questions/single/layout/expanded-code-modal';
import { BookIcon, BookOpen, FileIcon } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import RoadmapQuestionTabs from './[uid]/layout/roadmap-question-tabs';
import { useRoadmapQuestion } from './[uid]/layout/roadmap-question-context';
import QuestionAccordion from '@/components/app/questions/single/question-accordion';
import QuestionResult from '../../shared/answer-submitted';
import QuestionCodeDisplay from '../../shared/question-code-display';

export default function RoadmapQuestionCard(opts: {
  user: UserRecord;
  question: RoadmapUserQuestions;
  roadmapUid: string;
}) {
  const { user, question, roadmapUid } = opts;

  const {
    currentLayout,
    setCurrentLayout,
    correctAnswer,
    userAnswer,
    nextQuestion,
    showHint,
    answerHelp,
    generateAiAnswerHelp,
  } = useRoadmapQuestion();

  const [activeTab, setActiveTab] = useState<
    'description' | 'resources' | 'stats'
  >('description');

  // toggle layout only between questions and codeSnippet
  // the answer is after the user has submitted their answer
  const toggleLayout = () => {
    // determine what type
    setCurrentLayout(
      currentLayout === 'questions' ? 'codeSnippet' : 'questions'
    );
  };

  const switcherText = () => {
    return currentLayout === 'questions'
      ? '(Tap to view code snippet)'
      : '(Tap to view question)';
  };

  return (
    <Tabs
      defaultValue="description"
      className="h-full bg-black-75 border border-black-50 rounded-lg flex flex-col overflow-hidden"
    >
      <div className="p-4 lg:px-3 lg:py-2 w-full flex flex-col gap-3 md:flex-row justify-between bg-black-25 md:items-center">
        <div className="flex items-center gap-2 justify-between w-full">
          <TabsList className="hidden lg:grid h-auto w-fit grid-cols-3 gap-5 text-white rounded-lg bg-transparent p-1">
            <TabsTrigger
              value="description"
              onClick={() => setActiveTab('description')}
              className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
            >
              <div className="mr-2">
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
              className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline w-fit border-0 px-0"
            >
              <div className="mr-2">
                {activeTab === 'resources' ? (
                  <BookOpen className="size-4" />
                ) : (
                  <BookIcon className="size-4" />
                )}
              </div>
              Resources
            </TabsTrigger>
          </TabsList>
          <div className="flex lg:hidden text-sm w-full items-center justify-end bg-black-25 gap-x-3">
            {/** explain question ai button */}
            <AiQuestionHelp
              question={question}
              user={user}
              isRoadmapQuestion={true}
            />
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
            className="text-xs block lg:hidden"
            padding="none"
            onClick={toggleLayout}
          >
            {switcherText()}
          </Button>
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="flex-1 bg-black overflow-y-auto scrollable-element">
        {currentLayout === 'questions' && <RoadmapQuestionTabs />}
        {currentLayout === 'codeSnippet' && (
          <>
            <QuestionCodeDisplay
              question={question}
              user={user}
              answerHelp={answerHelp}
            />
          </>
        )}
        {currentLayout === 'answer' && (
          <QuestionResult
            correctAnswer={correctAnswer}
            userAnswer={userAnswer}
            question={question}
            nextQuestion={nextQuestion}
            isCodeEditorQuestion={false}
            isRoadmapQuestion={true}
            roadmapUid={roadmapUid}
            generateAiAnswerHelp={generateAiAnswerHelp}
          />
        )}
      </div>
      <Separator className="bg-black-50" />
      <div className="w-full space-y-4 bg-black">
        {question.hint && (
          <QuestionAccordion hint={question.hint} showHint={showHint} />
        )}
      </div>
    </Tabs>
  );
}
