import { getQuestion } from '@/utils/data/questions/get';
import { Separator } from '@/components/ui/separator';
import NoDailyQuestion from '@/components/shared/no-daily-question';
import CodeDisplay from '@/components/app/layout/question-single/code-snippet';
import { useUserServer } from '@/hooks/use-user-server';
import QuestionCard from '@/components/app/layout/question-single/question-card';
import { getRandomQuestion } from '@/utils/data/questions/get-random';
import ExpandedCodeModal from '@/components/app/questions/single/expanded-code-modal';
import ResizableLayout from '@/components/ui/resizable-layout';
import AiQuestionHelp from '@/components/app/questions/single/ai-question-help';
import ChangeCodeTheme from '@/components/app/questions/single/change-code-theme';

export default async function TodaysQuestionPage({ params }: { params: { uid: string } }) {
  const { uid } = params;

  const user = await useUserServer();

  const [question, nextQuestion] = await Promise.all([
    getQuestion('uid', uid),
    getRandomQuestion({
      identifier: 'uid',
      currentQuestionSlug: uid,
    }),
  ]);

  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }

  const leftContent = (
    <div className="flex flex-col gap-y-4 p-3 lg:p-6 lg:pr-3 h-full">
      <QuestionCard
        questionPromise={Promise.resolve(question)}
        user={user}
        nextQuestion={nextQuestion}
        identifier="uid"
      />
    </div>
  );

  const rightTopContent = (
    <div className="hidden lg:flex flex-col gap-4 p-3 lg:p-6 lg:pl-3 h-full">
      <div
        id="code-snippet"
        className="bg-black-75 border border-black-50 rounded-xl relative overflow-hidden h-full"
      >
        <div className="p-4 text-sm flex w-full items-center justify-end bg-black-25 gap-x-3">
          {/** explain question ai button */}
          <AiQuestionHelp question={question} user={user} questionType="regular" />
          {/** code theme selector */}
          <ChangeCodeTheme user={user} />
          {/** code snippet */}
          {question.codeSnippet && <ExpandedCodeModal code={question.codeSnippet} />}
        </div>
        <Separator className="bg-black-50" />
        {question?.codeSnippet && (
          <CodeDisplay content={question.codeSnippet} backgroundColor="#111111" user={user} />
        )}
      </div>
    </div>
  );

  return (
    <ResizableLayout
      leftContent={leftContent}
      rightTopContent={rightTopContent}
      initialLeftWidth={50}
      rightBottomContent={null}
    />
  );
}
