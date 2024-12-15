import { DatePicker } from '@mantine/dates';
import { Grid } from '../ui/grid';
import Chip from '../ui/chip';
import { getUserFromSession } from '@/actions/user/authed/get-user';
import { getUserDailyStats } from '@/actions/user/authed/get-daily-streak';
import { FlameIcon } from 'lucide-react';

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
        <h6 className="text-xl text-center">Current streak</h6>
        {/* <p className="font-satoshi text-center">Your current daily streak!</p> */}
      </div>
      <div className="w-full h-fit flex items-center justify-center">
        <DatePicker
          className="z-30 text-white border border-black-50 p-2 rounded-md hover:cursor-default hover:text-black"
          color="white"
          type="range"
          value={dateArray}
          c="gray"
          inputMode="none"
        />
      </div>
      <div className="flex w-full justify-between items-end z-10 relative">
        <Chip
          color="accent"
          text="Streak"
        />
        {/* <Button variant="secondary">
          View more stats
          <ArrowRight className="size-3 ml-1 group-hover:ml-2 duration-300" />
        </Button> */}
        {/** display user's longest streak */}
        <div className="flex items-center gap-1 font-medium">
          <p className="font-satoshi">Longest streak:</p>
          <p className="font-satoshi">
            {userStreak?.streakData?.longestStreak}
          </p>
          <FlameIcon className="fill-red-500 text-orange-500" />
        </div>
      </div>
    </div>
  );
}
