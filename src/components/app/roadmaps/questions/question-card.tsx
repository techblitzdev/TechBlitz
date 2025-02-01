'use client';

import type { UserRecord } from '@/types/User';
import type { RoadmapUserQuestions } from '@/types/Roadmap';
import AiQuestionHelp from '@/components/app/questions/single/layout/ai-question-help';
import ChangeCodeTheme from '@/components/app/questions/single/layout/change-code-theme';
import ExpandedCodeModal from '@/components/app/questions/single/layout/expanded-code-modal';
import { BookIcon, BookOpen, FileIcon, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuestionTabs, { type TabConfig } from '@/components/app/shared/question-tabs';
import { useRoadmapQuestion } from './[uid]/layout/roadmap-question-context';
import QuestionAccordion from '@/components/app/questions/single/question-accordion';
import QuestionResult from '../../shared/answer-submitted';
import QuestionCodeDisplay from '../../shared/question-code-display';
import RoadmapQuestionTabs from './[uid]/layout/roadmap-question-tabs';
import QuestionResourceTab from '../../questions/resources/question-resource-tab';

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

  const toggleLayout = () => {
    setCurrentLayout(currentLayout === 'questions' ? 'codeSnippet' : 'questions');
  };

  const switcherText = () => {
    return currentLayout === 'questions' ? '(Tap to view code snippet)' : '(Tap to view question)';
  };

  const getDescriptionContent = () => {
    if (currentLayout === 'questions') {
      return <RoadmapQuestionTabs />;
    }
    if (currentLayout === 'codeSnippet') {
      return <QuestionCodeDisplay question={question} user={user} answerHelp={answerHelp} />;
    }
    if (currentLayout === 'answer') {
      return (
        <QuestionResult
          correctAnswer={correctAnswer}
          userAnswer={userAnswer}
          question={question}
          nextQuestionHref={nextQuestion ? `/roadmap/${roadmapUid}/${nextQuestion.uid}` : undefined}
          isCodeEditorQuestion={false}
          isRoadmapQuestion={true}
          roadmapUid={roadmapUid}
          generateAiAnswerHelp={generateAiAnswerHelp}
        />
      );
    }
    return null;
  };

  const tabs: TabConfig[] = [
    {
      value: 'description',
      label: 'Description',
      icon: <FileIcon className="size-4" />,
      activeIcon: <FileText className="size-4" />,
      content: getDescriptionContent(),
    },
    {
      value: 'resources',
      label: 'Resources',
      icon: <BookIcon className="size-4" />,
      activeIcon: <BookOpen className="size-4" />,
      content: (
        <div className="p-4">
          <h3 className="font-inter font-light text-lg md:text-2xl">
            A list of helpful resources to help you answer this question.
          </h3>
          <QuestionResourceTab resources={[]} reference={question.uid || undefined} />
        </div>
      ),
    },
  ];

  const headerContent = (
    <div className="flex lg:hidden text-sm w-full items-center justify-end bg-black-25 gap-x-3">
      <AiQuestionHelp question={question} user={user} questionType="roadmap" />
      <ChangeCodeTheme user={user} />
      {question.codeSnippet && <ExpandedCodeModal code={question.codeSnippet} />}
      <Button
        variant="ghost"
        className="text-xs block lg:hidden"
        padding="none"
        onClick={toggleLayout}
      >
        {switcherText()}
      </Button>
    </div>
  );

  const footerContent = question.hint && (
    <QuestionAccordion hint={question.hint} showHint={showHint} showRelatedQuestions={false} />
  );

  return (
    <QuestionTabs
      tabs={tabs}
      defaultTab="description"
      headerContent={headerContent}
      footerContent={footerContent}
    />
  );
}
