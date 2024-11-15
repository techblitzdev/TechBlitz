import { getQuestion } from '@/actions/questions/get';
import LoadingSpinner from '@/components/ui/loading';
import AnswerQuestionForm from '@/components/questions/answer-question-form';
import { Separator } from '@/components/ui/separator';
import NoDailyQuestion from '@/components/global/errors/no-daily-question';
import QuestionDisplay from '@/components/questions/code-snippet';
import {
  ArrowRight,
  ChartColumn,
  Check,
  ChevronRight,
  Expand,
  ShieldQuestionIcon,
  User,
} from 'lucide-react';
import BackToDashboard from '@/components/global/back-to-dashboard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Chip from '@/components/global/chip';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import TagDisplay from '@/components/questions/previous/tag-display';
import { getQuestionStats } from '@/actions/questions/get-question-stats';
import { useUserServer } from '@/hooks/useUserServer';
import Stopwatch from '@/components/questions/stopwatch';

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
    return <NoDailyQuestion />;
  }

  const totalSubmissions = await getQuestionStats(uid);

  return (
    <>
      <div className="flex gap-8 mt-3">
        {/* Left Section - Question and Stats */}
        <div className="flex flex-col gap-y-4 w-1/2 relative overflow-hidden h-fit">
          {/* Question Card */}
          <Button className="border border-black-50">Question</Button>
          <div className="col-span-full lg:col-span-6 h-fit bg-black-75 border border-black-50 rounded-xl overflow-hidden">
            <div className="p-4 w-full flex justify-between bg-black-25">
              <Chip
                color={getQuestionDifficultyColor(question.difficulty)}
                text={capitalise(question.difficulty)}
                textColor={getQuestionDifficultyColor(question.difficulty)}
                ghost
              />
              {user?.showTimeTaken && <Stopwatch />}
            </div>
            <Separator className="bg-black-50" />
            <div className="h-fit bg-black-100">
              {question.dailyQuestion && (
                <div className="p-4">
                  <h3 className="font-inter text-gray-400 text-xs font-light">
                    This question is a daily question and will count towards
                    your daily streak.
                  </h3>
                </div>
              )}
              {question?.question && (
                <div className="px-4">
                  <h3 className="font-inter font-light">{question.question}</h3>
                </div>
              )}

              <AnswerQuestionForm
                userData={user}
                uid={uid}
                question={question}
              />
            </div>
            <Separator className="bg-black-50" />
            {question?.tags && (
              <>
                <Separator className="bg-black-100 w-full" />
                <div className="p-4 w-full flex justify-between items-center">
                  <TagDisplay tags={question.tags} variant="secondary" />
                  <div className="flex items-center gap-4 self-end">
                    <Button variant="destructive">Reset</Button>
                    <Button variant="accent">Submit</Button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Stats Card */}
          <div className="bg-black-75 border border-black-50 rounded-xl">
            <div className="flex items-center gap-x-1 p-4">
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
                |
                <div className="flex items-center gap-2">
                  <p>Success rate:</p>
                  <p>{totalSubmissions?.percentageCorrect}%</p>
                </div>
                |
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <Check className="size-4 text-green-500" />
                    <p>Correct:</p>
                  </div>
                  <p className="">
                    {totalSubmissions?.totalCorrectSubmissions}
                  </p>
                </div>
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
          <div className="h-36 bg-black-75 border border-black-50 rounded-xl overflow-hidden">
            <div className="flex items-center gap-x-1 p-4">
              <ShieldQuestionIcon className="size-4" />
              <div className="text-sm">Related Questions</div>
            </div>
            <Separator className="bg-black-50" />
            <div className="p-4">
              <p className="text-sm text-gray-400">
                No related questions available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
