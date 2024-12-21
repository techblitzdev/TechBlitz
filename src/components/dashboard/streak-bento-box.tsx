import { DatePicker } from '@mantine/dates';
import { Grid } from '../ui/grid';
import Chip from '../ui/chip';
import { getUserFromSession } from '@/actions/user/authed/get-user';
import { getUserDailyStats } from '@/actions/user/authed/get-daily-streak';
import { FlameIcon } from 'lucide-react';
import ProgressChart from '../marketing/homepage/features/progression-chart';
import { Suspense } from 'react';

export default async function StreakBentoBox() {
  const { data: user, error } = await getUserFromSession();
  if (!user || !user.user?.id) return;

  // get the user's streak data
  const userStreak = await getUserDailyStats(user?.user?.id);

  // get the streak start date and streak end date
  const startDate = userStreak?.streakData?.streakStart as Date;
  const endDate = userStreak?.streakData?.streakEnd as Date;

  // create an array of dates between the start and end date
  const dateArray: [Date, Date] = [startDate, endDate];

  return (
    <div className="space-y-4 group relative overflow-hidden p-4 h-full">
      <div className="space-y-1">
        <h6 className="text-xl">Statistics</h6>
      </div>
      <div className="w-full h-fit flex items-center justify-center absolute">
        <Suspense fallback={null}>
          <ProgressChart hideHeader={true} isStatic={true} />
        </Suspense>
      </div>
    </div>
  );
}
