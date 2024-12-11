import { getUserDailyStats } from '@/actions/user/authed/get-daily-streak';
import { useUserServer } from '@/hooks/useUserServer';
import { Flame } from 'lucide-react';

export default async function CurrentStreak() {
  const user = await useUserServer();
  if (!user) return;

  const userStreak = await getUserDailyStats(user?.uid);

  return (
    <div className="flex items-center gap-x-1">
      <Flame className="fill-red-500 text-orange-500" />
      <p className="font-ubuntu font-bold">
        {userStreak?.streakData?.currentstreakCount}{' '}
      </p>
    </div>
  );
}
