'use client';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { RoadmapGenerationProgress } from '@prisma/client';
import { motion, AnimatePresence } from 'framer-motion';

const statusMessages = {
  FETCHING_DATA: 'Fetching data for your personalized roadmap',
  FIRST_PASS: 'Generating initial roadmap structure',
  SECOND_PASS: 'Refining and optimizing your roadmap',
  GENERATING_QUESTIONS: 'Creating follow-up questions for further customization',
  GENERATED: 'Your roadmap is ready!',
};

function AnimatedStatusText({ status }: { status: RoadmapGenerationProgress['status'] | null }) {
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={status}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {status
          ? statusMessages[status as keyof typeof statusMessages]
          : 'Preparing to create your roadmap...'}
      </motion.p>
    </AnimatePresence>
  );
}

export default function CreatingRoadmapModal({
  generationProgress,
  roadmapUid,
}: {
  generationProgress: RoadmapGenerationProgress | null;
  roadmapUid: string;
}) {
  return (
    <DialogContent className="bg-black-75 md:max-w-xl max-h-[1000px] overflow-y-scroll">
      <DialogHeader>
        <DialogTitle className="text-2xl">
          {generationProgress?.status === 'GENERATED' ? 'Roadmap created!' : 'Creating roadmap...'}
        </DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <div className="flex flex-col gap-y-4">
          <AnimatedStatusText status={generationProgress?.status ?? null} />
        </div>
      </DialogDescription>
      <DialogFooter className="flex justify-end">
        <Button
          disabled={generationProgress?.status !== 'GENERATED'}
          variant="accent"
          href={`/roadmap/${roadmapUid}`}
          className={cn(
            generationProgress?.status !== 'GENERATED' && 'opacity-50 cursor-not-allowed'
          )}
        >
          {generationProgress?.status === 'GENERATED' ? 'View Roadmap' : 'Generating...'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
