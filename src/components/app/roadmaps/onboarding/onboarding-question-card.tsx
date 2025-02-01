'use client';
import QuestionTabs from '@/components/app/shared/question-tabs';
import { DefaultRoadmapQuestions } from '@prisma/client';
import { FileText } from 'lucide-react';
import QuestionAccordion from '../../questions/single/question-accordion';
import OnboardingRoadmapAnswerQuestionForm from './onboarding-answer-form';
import { capitalise } from '@/utils';
import { getQuestionDifficultyColor } from '@/utils';
import Chip from '@/components/ui/chip';
import QuestionHintTrigger from '../../questions/question-hint-trigger';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRoadmapOnboardingContext } from './roadmap-onboarding-context';
import QuestionResult from '../../shared/answer-submitted';
import AiQuestionHelp from '../../questions/single/layout/ai-question-help';
import ChangeCodeTheme from '../../questions/single/layout/change-code-theme';
import ExpandedCodeModal from '../../questions/single/layout/expanded-code-modal';
import QuestionCodeDisplay from '../../shared/question-code-display';

export default function OnboardingQuestionCard({
  question,
}: {
  question: DefaultRoadmapQuestions;
}) {
  const {
    answerRoadmapOnboardingQuestion,
    resetQuestionState,
    currentLayout,
    correctAnswer,
    userAnswer,
    nextQuestionIndex,
    roadmapUid,
    loading,
    isLastQuestion,
    setCurrentLayout,
    user,
    setShowHint,
    showHint,
    generateAiAnswerHelp,
  } = useRoadmapOnboardingContext();

  const toggleLayout = () => {
    setCurrentLayout(currentLayout === 'questions' ? 'codeSnippet' : 'questions');
  };

  const switcherText = () => {
    return currentLayout === 'questions' ? '(Tap to view code snippet)' : '(Tap to view question)';
  };

  const nextQuestionHref = isLastQuestion
    ? `/roadmap/${roadmapUid}/onboarding/generate`
    : `/roadmap/${roadmapUid}/onboarding/${nextQuestionIndex}`;

  const descriptionContent = () => {
    return (
      <TabsContent value="description" className="flex flex-col gap-4">
        {currentLayout === 'questions' && (
          <div className="flex flex-col gap-4 p-4 pt-0">
            <div className="flex w-full justify-between gap-5 mb-5 pt-4">
              <div className="flex w-full gap-2 items-center">
                <Chip
                  color={getQuestionDifficultyColor(question.difficulty).bg}
                  text={capitalise(question.difficulty)}
                  textColor={getQuestionDifficultyColor(question.difficulty).text}
                  border={getQuestionDifficultyColor(question.difficulty).border}
                />
              </div>
              <div className="flex items-center">
                <QuestionHintTrigger showHint={showHint} setShowHint={setShowHint} />
              </div>
            </div>
            {question?.question && (
              <div className="flex w-full gap-10 justify-between">
                <h3 className="font-onest font-light text-lg md:text-2xl">{question.question}</h3>
              </div>
            )}
            <OnboardingRoadmapAnswerQuestionForm />
          </div>
        )}
        {currentLayout === 'codeSnippet' && (
          <QuestionCodeDisplay question={question} user={user} answerHelp={null} />
        )}
        {currentLayout === 'answer' && (
          <>
            <QuestionResult
              correctAnswer={correctAnswer}
              userAnswer={userAnswer}
              question={question}
              isCodeEditorQuestion={false}
              isRoadmapQuestion={true}
              roadmapUid={roadmapUid}
              generateAiAnswerHelp={generateAiAnswerHelp}
              showQuestionDifficulty={false} // onboarding question, don't show difficulty
              showCorrectAnswer={false} // onboarding question, don't give away the answer
              nextQuestionHref={nextQuestionHref}
              isOnboardingQuestion={true}
              isLastQuestion={isLastQuestion}
            />
          </>
        )}
      </TabsContent>
    );
  };

  const headerContent = (
    <div className="flex lg:hidden text-sm w-full items-center justify-end bg-black-25 gap-x-3">
      <AiQuestionHelp question={question} user={user} questionType="onboarding" />
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

  const footer = () => {
    return (
      <div className="flex flex-col">
        {question.hint && (
          <QuestionAccordion
            hint={question.hint}
            showHint={showHint}
            showRelatedQuestions={false}
          />
        )}
        <Separator className="bg-black-50" />
        {/** submit buttons */}
        <div className="flex w-full justify-end gap-3 p-4">
          <Button
            variant="destructive"
            onClick={resetQuestionState}
            disabled={loading || correctAnswer !== 'init'}
          >
            Reset
          </Button>
          <Button
            variant="default"
            onClick={answerRoadmapOnboardingQuestion}
            className="text-green-500"
            disabled={loading || !userAnswer}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  };

  return (
    <QuestionTabs
      headerContent={headerContent}
      tabs={[
        {
          value: 'description',
          label: 'Description',
          content: descriptionContent(),
          icon: <FileText className="size-4" />,
          activeIcon: <FileText className="size-4" />,
        },
      ]}
      footerContent={footer()}
    />
  );
}
