import { getQuestion } from '@/actions/questions/get';
import { getRandomQuestion } from '@/actions/questions/get-next-question';
import BackToDashboard from '@/components/global/back-to-dashboard';
import CurrentStreak from '@/components/global/current-streak';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUserServer } from '@/hooks/useUserServer';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';
import Link from 'next/link';

export default async function QuestionUidLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { uid: string } }>) {
  const { uid } = params;

  const question = await getQuestion(uid);
  const user = await useUserServer();
  if (!user) return;

  const nextQuestion = await getRandomQuestion({
    currentQuestionId: uid,
    userUid: user.uid,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-5 py-2">
          {/** Previous question button */}
          <BackToDashboard />
          {question?.dailyQuestion && question?.questionDate && (
            <div className="font-ubuntu flex gap-x-5 items-center">
              <p>Daily question</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-x-5">
          <CurrentStreak />
          <div className="flex gap-x-2 items-center">
            <TooltipProvider delayDuration={0} skipDelayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={`/question/${nextQuestion}`}
                    className="bg-black-100 border border-black-50 p-2 rounded-md relative group duration-200 size-8 flex items-center justify-center"
                  >
                    <ChevronLeft className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                    <ArrowLeft className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-white font-inter">
                  Previous question
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0} skipDelayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={`/question/${nextQuestion}`}
                    className="bg-black-100 border border-black-50 p-2 rounded-md relative group duration-200 size-8 flex items-center justify-center"
                  >
                    <ChevronRight className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                    <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">Next question</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </>
  );
}
