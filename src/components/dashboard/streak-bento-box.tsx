'use client';
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { Grid } from '../ui/grid';

export default function StreakBentoBox() {
  const today = new Date();
  const date = new Date(today).setDate(today.getDate() - 10);

  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(date),
    today,
  ]);

  return (
    <div className="space-y-4 group relative overflow-hidden p-4">
      <div className="space-y-1">
        <h6 className="text-xl text-center">Current streak</h6>
        {/* <p className="font-satoshi text-center">Your current daily streak!</p> */}
      </div>
      <div className="w-full h-fit flex items-center justify-center">
        <DatePicker
          className="z-30 text-white border border-black-50 p-2 rounded-md bg-black-100 hover:cursor-default"
          color="white"
          type="range"
          value={value}
          onChange={setValue}
          c="gray"
          inputMode="none"
          onClick={(e) => e.preventDefault()}
        />
      </div>
      <div className="flex w-full justify-end">
        <Button variant="secondary">
          View more stats
          <ArrowRight className="size-3 ml-1 group-hover:ml-2 duration-300" />
        </Button>
      </div>
      <Grid size={20} position="bottom-left" />
    </div>
  );
}
