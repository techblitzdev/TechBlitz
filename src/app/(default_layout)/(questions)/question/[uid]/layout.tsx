import { getQuestion } from '@/actions/questions/get';
import { getUserDailyStats } from '@/actions/user/get-daily-streak';
import BackToDashboard from '@/components/global/back-to-dashboard';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/useUserServer';
import { ArrowRight, ChevronRight, Flame } from 'lucide-react';
import Link from 'next/link';

export default async function QuestionUidLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { uid: string } }>) {
  const { uid } = params;

  const question = await getQuestion(uid);
  const user = await useUserServer();
  if (!user) return;

  const userStreak = await getUserDailyStats(user?.uid);

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
          <div className="flex items-center gap-x-1">
            <Flame className="fill-red-500 text-orange-500" />
            <p className="font-ubuntu font-bold">
              {userStreak?.streakData?.currentstreakCount}{' '}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="bg-black-100 border border-black-50 p-2 rounded-md relative group duration-200 size-8 flex items-center justify-center"
          >
            <ChevronRight className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
            <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
          </Link>
        </div>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </>
  );
}
