'use client';
import type React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

import type { UserRecord } from '@/types/User';

//import { capitalise } from '@/utils';
//import { difficultyToExperienceLevel } from '@/utils';
import { Mission } from '@prisma/client';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface DailyGoalsCardProps {
  user: UserRecord | null;
  missions: Mission[];
}

const DailyGoalsCard: React.FC<DailyGoalsCardProps> = ({ user, missions }) => {
  return (
    <motion.div
      initial={{ height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="bg-[#090909] border border-black-50 rounded-lg p-4 overflow-hidden"
    >
      <div className="flex items-center gap-x-2">
        {/*
        <Spaceship2 height="36" width="36" />
        */}
        <h3 className="text-lg font-semibold">Daily Missions</h3>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="mt-4 space-y-4">
        {missions.map((mission) => (
          <MissionItem key={mission.uid} mission={mission} />
        ))}
      </motion.div>
    </motion.div>
  );
};

function MissionItem({ mission }: { mission: Mission }) {
  const progress = 0 * 100;

  return (
    <motion.div variants={item} className="flex items-center gap-3">
      <div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center">
        <div dangerouslySetInnerHTML={{ __html: mission.icon ?? '' }} className="size-full" />
      </div>
      <div className="flex flex-col gap-y-1 w-full">
        <p className="text-sm text-muted-foreground font-onest">{mission.title}</p>
        <Progress value={progress} className="h-2" indicatorColor="bg-green-500" />
      </div>
    </motion.div>
  );
}

export default DailyGoalsCard;
