import { getQuestion } from '@/actions/questions/get';
import { Separator } from '@/components/ui/separator';
import NoDailyQuestion from '@/components/global/errors/no-daily-question';
import QuestionDisplay from '@/components/questions/single/code-snippet';
import {
  ChartColumn,
  Check,
  Expand,
  ShieldQuestionIcon,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getQuestionStats } from '@/actions/questions/get-question-stats';
import { useUserServer } from '@/hooks/useUserServer';

import QuestionCard from '@/components/questions/single/question-card';
import { getRandomQuestion } from '@/actions/questions/get-next-question';
import { getRelatedQuestions } from '@/actions/questions/get-related';
import RelatedQuestionCard from '@/components/questions/single/related-question-card';

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

  const question = await getQuestion(uid);
  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }

  const totalSubmissions = await getQuestionStats(uid);
  const nextQuestion = await getRandomQuestion({
    currentQuestionId: uid,
    userUid: user.uid,
  });

  const relatedQuestions = await getRelatedQuestions({
    questionUid: uid,
    tags: question.tags || [],
  });

  return (
    <>
      <div className="flex gap-8 mt-3 px-6">
        {/* Left Section - Question and Stats */}
        <div className="flex flex-col gap-y-4 w-1/2 relative overflow-hidden h-fit">
          {/* Question Card */}
          <Button className="border border-black-50">Question</Button>
          <QuestionCard
            question={question}
            user={user}
            nextQuestion={nextQuestion}
          />

          {/* Stats Card */}
          <div className="bg-black-75 border border-black-50 rounded-xl overflow-hidden">
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

        {/* Right Section - Code Snippet and Related Questions */}
        <div className="w-1/2 h-3/4 grid-cols-subgrid gap-8 flex flex-col">
          {/* Code Snippet */}
          <div className="h-[45rem] col-span-full bg-black-75 border border-black-50 rounded-xl relative overflow-hidden">
            <div className="p-4 text-sm flex w-full items-center justify-between bg-black-25">
              <p>Code</p>
              <div className="flex items-center gap-x-3">
                <Expand className="size-4 text-gray-500" />
              </div>
            </div>
            <Separator className="bg-black-50" />
            {question?.codeSnippet && (
              <QuestionDisplay content={question.codeSnippet} language="" />
            )}
          </div>

          {/* Related Questions Card */}
          <div className="min-h-fit bg-black-75 border border-black-50 rounded-xl overflow-hidden">
            <div className="flex items-center bg-black-25 gap-x-1 p-4">
              <ShieldQuestionIcon className="size-4" />
              <div className="text-sm">Related Questions</div>
            </div>
            <Separator className="bg-black-50" />
            <div className="divide-y-[1px] divide-black-50">
              {relatedQuestions.length > 0 ? (
                relatedQuestions.map((relatedQuestion, index) => (
                  <RelatedQuestionCard
                    question={relatedQuestion}
                    index={index}
                  />
                ))
              ) : (
                <div className="p-4 text-sm">No related questions found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
