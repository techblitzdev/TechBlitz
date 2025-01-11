import { getQuestion } from '@/utils/data/questions/get';
import { Separator } from '@/components/ui/separator';
import NoDailyQuestion from '@/components/global/no-daily-question';
import QuestionDisplay from '@/components/app/questions/single/code-snippet';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import { useUserServer } from '@/hooks/use-user-server';
import QuestionCard from '@/components/app/questions/single/question-card';
import { getRandomQuestion } from '@/utils/data/questions/get-random';
import ExpandedCodeModal from '@/components/app/questions/expanded-code-modal';
import ResizableLayout from '@/components/ui/resizable-layout';
import EditorIcon from '@/components/ui/icons/editor';
import AiQuestionHelp from '@/components/app/questions/ai-question-help';

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
    <div className="flex flex-col gap-y-4 p-6 pr-3">
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
    <div className="flex flex-col gap-4 p-6 pl-3">
      <div
        id="code-snippet"
        className="h-fit lg:h-[45rem] bg-black-75 border border-black-50 rounded-xl relative overflow-hidden"
      >
        <div className="p-4 text-sm flex w-full items-center justify-end bg-black-25 gap-x-3">
          {/** explain question ai button */}
          <AiQuestionHelp question={question} />
          {/** code theme selector */}
          <EditorIcon />
          {/** code snippet */}
          {question.codeSnippet && (
            <ExpandedCodeModal code={question.codeSnippet} />
          )}
        </div>
        <Separator className="bg-black-50" />
        {question?.codeSnippet && (
          <QuestionDisplay
            content={question.codeSnippet}
            backgroundColor="#111111"
          />
        )}
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
