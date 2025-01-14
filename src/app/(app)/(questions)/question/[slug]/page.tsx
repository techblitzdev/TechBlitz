import { getQuestion } from '@/utils/data/questions/get';
import { Separator } from '@/components/ui/separator';
import NoDailyQuestion from '@/components/global/no-daily-question';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import { useUserServer } from '@/hooks/use-user-server';
import QuestionCard from '@/components/app/questions/single/layout/question-card';
import { getRandomQuestion } from '@/utils/data/questions/get-random';
import ExpandedCodeModal from '@/components/app/questions/single/layout/expanded-code-modal';
import ResizableLayout from '@/components/ui/resizable-layout';
import AiQuestionHelp from '@/components/app/questions/single/layout/ai-question-help';
import ChangeCodeTheme from '@/components/app/questions/single/layout/change-code-theme';
import CodeDisplayWrapper from '@/components/app/questions/single/layout/code-display-wrapper';

export default async function TodaysQuestionPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const user = await useUserServer();

  const [question, totalSubmissions, nextQuestion] = await Promise.all([
    getQuestion('slug', slug),
    getQuestionStats('slug', slug),
    getRandomQuestion({
      identifier: 'slug',
      currentQuestionSlug: slug,
    }),
  ]);

  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }

  const leftContent = (
    <div className="flex flex-col gap-y-4 p-3 lg:p-6 lg:pr-3 h-full">
      <QuestionCard
        question={question}
        totalSubmissions={totalSubmissions}
        user={user}
        nextQuestion={nextQuestion}
        identifier="slug"
      />
    </div>
  );

  const rightContent = (
    <div className="hidden lg:flex flex-col gap-4 p-3 lg:p-6 lg:pl-3 h-full">
      <div
        id="code-snippet"
        className="bg-black-75 border border-black-50 rounded-xl relative overflow-hidden h-full"
      >
        <div className="p-4 text-sm flex w-full items-center justify-end bg-black-25 gap-x-3">
          {/** explain question ai button */}
          <AiQuestionHelp question={question} user={user} />
          {/** code theme selector */}
          <ChangeCodeTheme user={user} />
          {/** code snippet */}
          {question.codeSnippet && (
            <ExpandedCodeModal code={question.codeSnippet} />
          )}
        </div>
        <Separator className="bg-black-50" />
        {question?.codeSnippet && <CodeDisplayWrapper />}
      </div>
    </div>
  );

  return (
    <ResizableLayout
      leftContent={leftContent}
      rightContent={rightContent}
      initialLeftWidth={50}
    />
  );
}
