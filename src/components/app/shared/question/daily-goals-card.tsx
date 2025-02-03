'use client';
import TreasureChest from '@/components/ui/icons/treasure-chest';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

const dummyMissions = [
  { id: 1, task: 'Answer 3 questions', completed: 2, total: 3 },
  { id: 2, task: 'Complete 1 hard challenge', completed: 0, total: 1 },
  { id: 3, task: 'Earn 50 XP', completed: 30, total: 50 },
];

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

export default function EnhancedDailyGoalsCard() {
  return (
    <motion.div
      initial={{ height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="bg-[#090909] border border-black-50 rounded-lg p-4 overflow-hidden"
    >
      <div className="flex items-center gap-x-2">
        <TreasureChest className="text-[#fadb2c]" height="36" width="36" />
        <h3 className="text-lg font-semibold">Daily Missions</h3>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="mt-4 space-y-4">
        {dummyMissions.map((mission) => (
          <MissionItem key={mission.id} mission={mission} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function MissionItem({ mission }: { mission: (typeof dummyMissions)[number] }) {
  const progress = (mission.completed / mission.total) * 100;

  return (
    <motion.div variants={item} className="flex items-center gap-5">
      <div className="bg-black border border-black-50 flex-shrink-0 size-10 rounded-full"></div>
      <div className="flex flex-col gap-y-2 w-full">
        <p className="text-sm text-muted-foreground">{mission.task}</p>
        <Progress value={progress} className="h-2" />
      </div>
    </motion.div>
  );
}
