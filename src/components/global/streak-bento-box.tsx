import { DatePicker } from '@mantine/dates';
import { Grid } from '../ui/grid';
import Chip from './chip';
import { getUserFromSession } from '@/actions/user/get-user';
import { getUserDailyStats } from '@/actions/user/get-daily-streak';

export default async function StreakBentoBox() {
  const { data: user, error } = await getUserFromSession();
  if (!user || !user.user?.id) return;

  // get the user's streak data
  const userStreak = await getUserDailyStats(user?.user?.id);

  // get the streak start date and streak end date
  const startDate = userStreak?.streakData?.streakEnd as Date;
  const endDate = userStreak?.streakData?.streakStart as Date;

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
          className="z-30 text-white border border-black-50 p-2 rounded-md bg-black-100 hover:cursor-default hover:text-black"
          color="white"
          type="range"
          value={dateArray}
          c="gray"
          inputMode="none"
        />
      </div>
      <div className="flex w-full justify-between items-end">
        <Chip color="accent" text="Streak" />
        {/* <Button variant="secondary">
          View more stats
          <ArrowRight className="size-3 ml-1 group-hover:ml-2 duration-300" />
        </Button> */}
      </div>
      <Grid size={20} position="bottom-left" />
    </div>
  );
}
