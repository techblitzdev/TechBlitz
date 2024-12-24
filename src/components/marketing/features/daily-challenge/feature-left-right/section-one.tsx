'use client';

import LeftRightBlock from '@/components/marketing/global/left-right-block';
import { DatePicker } from '@mantine/dates';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function FeatureLeftRightSectionThree() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    if (isInView) {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      setDateRange([today, nextWeek]);
    }
  }, [isInView]);

  const calendarVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <LeftRightBlock
      left={
        <div className="flex flex-col gap-y-6">
          <h2 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
            Achieve Your Goals Effortlessly
          </h2>
          <p className="text-white/70 max-w-xl text-base font-onest">
            TechBlitz empowers your growth with intuitive progress tracking. See
            how far you've come with streak counts that celebrate your
            dedication and keep you motivated. Stay on track, achieve
            consistency, and make self-improvement a daily habit.
          </p>
        </div>
      }
      right={
        <div
          ref={ref}
          className="relative flex items-center justify-center w-full h-full overflow-hidden"
        >
          <motion.div
            className="w-full max-w-fit p-4 backdrop-blur-sm rounded-xl border border-black-50 shadow-2xl relative top-12"
            style={{
              background:
                'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
            }}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={calendarVariants}
          >
            <DatePicker
              type="range"
              value={dateRange}
              onChange={setDateRange}
              size="lg"
              classNames={{
                calendarHeader: 'text-white/90',
                day: 'text-white/80 hover:bg-white/10',
                weekday: 'text-white/60',
                month: 'text-white/90',
              }}
            />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#000] to-transparent pointer-events-none z-30"></div>
        </div>
      }
    />
  );
}
