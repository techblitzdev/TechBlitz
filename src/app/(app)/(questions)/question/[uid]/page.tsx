import { getQuestion } from '@/actions/questions/get';
import { Separator } from '@/components/ui/separator';
import NoDailyQuestion from '@/components/global/no-daily-question';
import QuestionDisplay from '@/components/app/questions/single/code-snippet';
import { BarChartIcon as ChartColumn, Check, User } from 'lucide-react';
import { getQuestionStats } from '@/actions/questions/get-question-stats';
import { useUserServer } from '@/hooks/use-user-server';
import QuestionCard from '@/components/app/questions/single/question-card';
import { getRandomQuestion } from '@/actions/questions/get-random';
import ExpandedCodeModal from '@/components/app/questions/expanded-code-modal';
import RelatedQuestions from '@/components/app/questions/single/related-question-card';
import ResizableLayout from '@/components/ui/resizable-layout';

export default async function TodaysQuestionPage({
  params,
}: {
  params: { uid: string };
}) {
  const { uid } = params;

  const user = await useUserServer();

  const [question, totalSubmissions, nextQuestion] = await Promise.all([
    getQuestion(uid),
    getQuestionStats(uid),
    getRandomQuestion({
      currentQuestionUid: uid,
    }),
  ]);

  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }

  const leftContent = (
    <div className="flex flex-col gap-y-4 lg:pl-6 p-3">
      <QuestionCard
        question={question}
        user={user}
        nextQuestion={nextQuestion}
      />
    </div>
  );

  const rightContent = (
    <div className="flex flex-col gap-4 lg:pr-6 p-3">
      <div
        id="code-snippet"
        className="h-fit lg:h-[45rem] bg-black-75 border border-black-50 rounded-xl relative overflow-hidden"
      >
        <div className="p-4 text-sm flex w-full items-center justify-between bg-black-25">
          <p className="font-onest">index.js</p>{' '}
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

      {!question.customQuestion && (
        <div className="min-h-fit bg-black-75 border border-black-50 rounded-xl overflow-hidden">
          <RelatedQuestions uid={uid} tags={question.tags || []} />
        </div>
      )}

      {!question.customQuestion && (
        <div className="bg-black-75 border border-black-50 rounded-xl overflow-hidden min-h-fit">
          <div className="flex items-center gap-x-1 p-4 bg-black-25">
            <ChartColumn className="size-4" />
            <div className="text-sm">Stats</div>
          </div>
          <Separator className="bg-black-50" />
          <div className="p-4 flex items-center">
            <div className="flex items-start gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  <User className="size-4" />
                  <p>Total submissions:</p>
                </div>
                <p>{totalSubmissions?.totalSubmissions}</p>
              </div>
              {totalSubmissions?.percentageCorrect > 0 && (
                <>
                  |
                  <div className="flex items-center gap-0.5">
                    <Check className="size-4" />
                    <p>Success rate:</p>
                    <p>{totalSubmissions?.percentageCorrect}%</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
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
