'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const skeletonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  exit: { scale: 0, opacity: 0 },
};

export default function RoadmapFeatureBoxAnimation({ absolute }: { absolute: boolean }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const fillInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setIsComplete(true);
          setTimeout(() => {
            setProgress(0);
            setIsComplete(false);
          }, 3000); // Reset after 3 seconds
          return 100;
        }
        return prevProgress + 100 / 70; // Increase by 1/70th every 100ms to fill in 7 seconds
      });
    }, 100);

    return () => clearInterval(fillInterval);
  }, []);

  return (
    <>
      <CardContent className="pb-2 sm:pb-6 pt-3 sm:pt-6">
        <div className="flex items-center space-x-4 h-7 md:h-14">
          <AnimatePresence mode="wait">
            {isComplete ? (
              <motion.div
                key="check"
                variants={checkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="inline-flex size-5 sm:size-10 md:size-16 animate-shimmer items-center justify-center rounded-full bg-linear-to-r from-green-400 via-green-600 to-green-400 bg-[length:200%_100%] font-medium transition-colors">
                  <Check className="size-4 md:size-8 text-white" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="skeletons"
                variants={skeletonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-2 w-full"
              >
                <Skeleton
                  className={cn(
                    'h-7 bg-black-50 hidden md:block',
                    !absolute ? 'w-[250px]' : 'w-[400px]'
                  )}
                />
                <Skeleton
                  className={cn(
                    'h-4 md:h-7 w-full bg-black-50 md:block',
                    !absolute ? 'w-[180px]' : 'sm:w-[260px]'
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
      <CardFooter className="mt-2 flex flex-col items-start space-y-2.5">
        <motion.h3
          className="text-base sm:text-xl md:text-2xl font-semibold leading-none tracking-tight text-white"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isComplete ? 'Roadmap generated!' : 'Generating your roadmap...'}
        </motion.h3>
        <motion.p
          className="text-xs md:text-base text-muted-foreground"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isComplete
            ? "Your coding roadmap is ready. Let's explore it together!"
            : "We're working hard to create a coding roadmap that's perfect for you."}
        </motion.p>
        <Progress
          value={progress}
          className="w-full mt-7 "
          aria-label="Roadmap generation progress"
        />
      </CardFooter>
    </>
  );
}
