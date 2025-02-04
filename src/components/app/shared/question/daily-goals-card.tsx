'use client';
import type React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import Spaceship2 from '@/components/ui/icons/spaceship';
import TreasureChest from '@/components/ui/icons/treasure-chest';
import ChallengeFlag from '@/components/ui/icons/challenge-flag';
import XpStar from '@/components/ui/icons/xp-star';

import type { UserRecord } from '@/types/User';
import type { Mission } from '@/types/Mission';

import { capitalise } from '@/utils';
import { difficultyToExperienceLevel } from '@/utils';

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
}

const DailyGoalsCard: React.FC<DailyGoalsCardProps> = ({ user }) => {
  const missions = dummyMissions(user);

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
          <MissionItem key={mission.id} mission={mission} />
        ))}
      </motion.div>
    </motion.div>
  );
};

function MissionItem({ mission }: { mission: Mission }) {
  const progress = (mission.completed / mission.total) * 100;

  return (
    <motion.div variants={item} className="flex items-center gap-3">
      <div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center">
        {mission.icon}
      </div>
      <div className="flex flex-col gap-y-2 w-full">
        <p className="text-sm text-muted-foreground">{mission.task}</p>
        <Progress value={progress} className="h-2" indicatorColor="bg-green-500" />
      </div>
    </motion.div>
  );
}

const dummyMissions = (user: UserRecord | null): Mission[] => [
  {
    id: 1,
    task: 'Answer 3 questions',
    completed: 2,
    total: 3,
    icon: <TreasureChest width={28} height={28} />,
  },
  {
    id: 2,
    task: `Complete 1 ${capitalise(user?.experienceLevel ? difficultyToExperienceLevel[user.experienceLevel] : 'EASY')} challenge`,
    completed: 0,
    total: 1,
    icon: <ChallengeFlag width={28} height={28} />,
  },
  { id: 3, task: 'Earn 50 XP', completed: 30, total: 50, icon: <XpStar width={28} height={28} /> },
];

export default DailyGoalsCard;
