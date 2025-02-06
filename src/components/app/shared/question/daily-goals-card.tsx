'use client';
import type React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

import type { UserRecord } from '@/types/User';

//import { capitalise } from '@/utils';
//import { difficultyToExperienceLevel } from '@/utils';
import { Mission, UserMission } from '@prisma/client';
import { Check, CheckCircle2 } from 'lucide-react';

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
  missions: Mission[];
  userMissionRecords: UserMission[];
}

const DailyGoalsCard: React.FC<DailyGoalsCardProps> = ({ missions, userMissionRecords }) => {
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
          <MissionItem
            key={mission.uid}
            mission={mission}
            userMissionRecords={userMissionRecords}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

function MissionItem({
  mission,
  userMissionRecords,
}: {
  mission: Mission;
  userMissionRecords: UserMission[];
}) {
  const userMissionRecord = userMissionRecords.find((record) => record.missionUid === mission.uid);

  const requirements = mission.requirements;
  // turn into a percentage
  const progress = Number(
    (Number(userMissionRecord?.progress ?? 0) / Number(requirements ?? 1)) * 100
  );

  return (
    <motion.div variants={item} className="flex items-center gap-3">
      <div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center">
        <div dangerouslySetInnerHTML={{ __html: mission.icon ?? '' }} className="size-full" />
      </div>
      <div className="flex flex-col gap-y-1 w-full">
        <div className="flex items-center gap-x-2">
          <p className="text-sm text-muted-foreground font-onest">{mission.title}</p>
          {userMissionRecord?.status === 'COMPLETED' && (
            <Check height="16" width="16" className="text-green-500" />
          )}
        </div>
        <Progress value={progress} className="h-2" indicatorColor="bg-green-500" />
      </div>
    </motion.div>
  );
}

export default DailyGoalsCard;
