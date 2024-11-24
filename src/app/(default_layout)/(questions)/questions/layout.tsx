import { getUserDailyStats } from '@/actions/user/get-daily-streak';
import BackToDashboard from '@/components/global/back-to-dashboard';
import CurrentStreak from '@/components/global/current-streak';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/useUserServer';
import { Flame } from 'lucide-react';

export default async function QuestionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await useUserServer();
  if (!user) return;

  const userStreak = await getUserDailyStats(user?.uid);

  return (
    <div className="text-white flex flex-col gap-y-4 relative h-full">
      <div className="flex flex-col gap-y-2 justify-center w-full text-center">
        <div className="flex items-center w-full justify-between container">
          <BackToDashboard />
          <div className="flex flex-col gap-y-1 w-full justify-between">
            <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
              All questions
            </h1>
            <p className="font-ubuntu text-sm text-gray-300">
              Explore a diverse set of questions across multiple topics to
              enhance your knowledge.
            </p>
          </div>
          <CurrentStreak />
        </div>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </div>
  );
}
