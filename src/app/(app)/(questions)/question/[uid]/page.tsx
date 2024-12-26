import { getQuestion } from '@/actions/questions/get';
import { Separator } from '@/components/ui/separator';
import NoDailyQuestion from '@/components/global/errors/no-daily-question';
import QuestionDisplay from '@/components/questions/single/code-snippet';
import { ChartColumn, Check, User } from 'lucide-react';
import { getQuestionStats } from '@/actions/questions/get-question-stats';
import { useUserServer } from '@/hooks/useUserServer';

import QuestionCard from '@/components/questions/single/question-card';
import { getRandomQuestion } from '@/actions/questions/get-next-question';
import ExpandedCodeModal from '@/components/questions/expanded-code-modal';
import RelatedQuestions from '@/components/questions/single/related-question-card';

export default async function TodaysQuestionPage({
  params,
}: {
  params: { uid: string };
}) {
  const { uid } = params;
  const user = await useUserServer();
  if (!user) {
    return;
  }

  // run all of these in parallel as they do not depend on each other
  const [question, totalSubmissions, nextQuestion] = await Promise.all([
    getQuestion(uid),
    getQuestionStats(uid),
    getRandomQuestion({
      currentQuestionId: uid,
      userUid: user.uid,
    }),
  ]);

  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 mt-3 px-6">
        {/* Left Section - Question and Stats */}
        <div className="flex flex-col gap-y-4 w-full lg:w-1/2 relative overflow-hidden h-fit">
          {/* Question Card */}
          <QuestionCard
            question={question}
            user={user}
            nextQuestion={nextQuestion}
          />
        </div>

        {/* Right Section - Code Snippet and Related Questions */}
        <div className="w-full lg:w-1/2 lg:h-3/4 grid-cols-subgrid gap-8 flex flex-col">
          {/* Code Snippet */}
          <div
            id="code-snippet"
            className="h-fit lg:h-[45rem] col-span-full bg-black-75 border border-black-50 rounded-xl relative overflow-hidden"
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
                backgroundColor="#000000"
              />
            )}
          </div>

          {/* Related Questions Card */}
          <div className="min-h-fit bg-black-75 border border-black-50 rounded-xl overflow-hidden">
            <RelatedQuestions uid={uid} tags={question.tags || []} />
          </div>

          {/* Stats Card */}
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
        </div>
      </div>
    </>
  );
}
