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

export default function OnboardingQuestionCard({
  question,
  showHint,
}: {
  question: DefaultRoadmapQuestions;
  showHint: boolean;
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
  } = useRoadmapOnboardingContext();

  console.log(nextQuestionIndex);

  const nextQuestionHref = isLastQuestion
    ? `/roadmap/${roadmapUid}/onboarding/generate`
    : `/roadmap/${roadmapUid}/onboarding/${nextQuestionIndex}`;

  const descriptionContent = () => {
    return (
      <TabsContent value="description" className="flex flex-col gap-4 p-4 pt-0">
        {currentLayout === 'questions' && (
          <>
            <div className="flex w-full justify-between gap-5 mb-5 pt-4">
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
              </div>
              <div className="flex items-center">
                <QuestionHintTrigger
                  showHint={showHint}
                  setShowHint={() => {}}
                />
              </div>
            </div>
            {question?.question && (
              <div className="flex w-full gap-10 justify-between">
                <h3 className="font-onest font-light text-lg md:text-2xl">
                  {question.question}
                </h3>
              </div>
            )}
            <OnboardingRoadmapAnswerQuestionForm />
          </>
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
              generateAiAnswerHelp={() => {}}
              showQuestionDifficulty={false} // onboarding question, don't show difficulty
              showCorrectAnswer={false} // onboarding question, don't give away the answer
              nextQuestionHref={nextQuestionHref}
            />
          </>
        )}
      </TabsContent>
    );
  };

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
