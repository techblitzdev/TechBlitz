import Chip from '@/components/ui/chip';
import { Button } from '@/components/ui/button';
import TagDisplay from '@/components/app/questions/tag-display';
import NoDailyQuestion from '@/components/shared/no-daily-question';
import { ArrowUpRight } from 'lucide-react';

import { getQuestionDifficultyColor, capitalise } from '@/utils';
import { getTodaysQuestion } from '@/utils/data/questions/get-today';
import Link from 'next/link';
import { DatePicker } from '@mantine/dates';
import { getUserDailyStats } from '@/utils/data/user/authed/get-daily-streak';

export default async function TodaysQuestionBentoBox() {
  // get the user streak and suggestion in one go
  const [userStreak, todaysQuestion] = await Promise.all([
    getUserDailyStats(),
    getTodaysQuestion(),
  ]);

  // get the streak start date and streak end date
  const startDate = userStreak?.streakData?.streakStart as Date;
  const endDate = userStreak?.streakData?.streakEnd as Date;

  // create an array of dates between the start and end date
  const dateArray: [Date, Date] = [startDate, endDate];

  if (!todaysQuestion)
    return (
      <div className="p-4">
        <NoDailyQuestion variant="accent" />
      </div>
    );

  const tags = todaysQuestion?.tags || [];

  return (
    <Link
      href={`/question/${todaysQuestion.slug}`}
      className="flex flex-col p-4 h-full group relative"
    >
      <>
        <div className="flex w-full justify-between mb-4">
          <div className="space-y-1">
            <h6 className="text-xl">Today's Question </h6>
            <p className="text-xs font-onest">
              Answer today's question to keep your streak <br /> going!
            </p>
          </div>
          <Button variant="accent" className="size-10" padding="none">
            <ArrowUpRight className="size-5 group-hover:rotate-45 duration-300" />
          </Button>
        </div>
        <div className="flex flex-wrap space-y-2 w-full items-end justify-between">
          <div className="space-y-1">
            <h6>Topics:</h6>
            <div className="flex gap-x-2 mt-2">
              <TagDisplay tags={tags} numberOfTags={2} variant="secondary" />
            </div>
          </div>
          <Chip
            color={getQuestionDifficultyColor(todaysQuestion.difficulty).bg}
            text={capitalise(todaysQuestion.difficulty)}
            textColor={getQuestionDifficultyColor(todaysQuestion.difficulty).text}
            border={getQuestionDifficultyColor(todaysQuestion.difficulty).border}
          />
        </div>

        <div className="w-fit flex self-center relative -bottom-8 sm:-bottom-20 md:-bottom-8 lg:-bottom-20">
          <DatePicker
            className="z-30 text-white bg-black-100 border border-black-50 p-2 rounded-md hover:cursor-default xs:scale-100 sm:scale-125 md:scale-105 xl:scale-[1.2]"
            color="white"
            type="range"
            value={dateArray}
            c="gray"
            inputMode="none"
          />
        </div>
      </>
    </Link>
  );
}
