'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { RoadmapGenerationProgress } from '@prisma/client';

const statusMessages = {
  ERROR: 'An error occurred, please try again.',
  FETCHING_DATA: 'Fetching data...',
  FIRST_PASS: 'Generating initial roadmap...',
  SECOND_PASS: 'Refining roadmap...',
  GENERATING_QUESTIONS: 'Creating follow-up questions...',
  GENERATED: 'Roadmap ready!',
};

export function AnimatedStatusText({
  status,
}: {
  status: RoadmapGenerationProgress['status'] | null;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 right-0 text-center"
      >
        {status ? statusMessages[status as keyof typeof statusMessages] : 'Creating...'}
      </motion.div>
    </AnimatePresence>
  );
}
