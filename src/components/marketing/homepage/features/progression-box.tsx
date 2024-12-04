'use client';

import React, { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import ProgressChart from './progression-chart';

export default function ProgressionBentoBox() {
  const [dateArray, setDateArray] = useState<[Date, Date]>([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 12))
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-28 flex flex-col gap-4 w-full bg-black rounded-lg border border-white/10"
    >
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <span className="text-white font-semibold font-onest">
            Current Streak
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white text-xs flex items-center font-onest"
        >
          View Details <ChevronRight className="w-4 h-4 ml-1" />
        </motion.button>
      </div> */}
      {/* <DatePicker
        className="z-30 text-white p-2 rounded-md bg-black transition-colors"
        type="range"
        value={dateArray}
        inputMode="none"
        color="gray"
      /> */}
      <ProgressChart />
      {/* <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white">Progress</span>
          <span className="text-white font-semibold">75%</span>
        </div>
        <Progress
          value={75}
          className="w-full h-2"
        />
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-white">Current Streak</span>
        <span className="text-white font-semibold">7 days</span>
      </div> */}
    </motion.div>
  );
}
