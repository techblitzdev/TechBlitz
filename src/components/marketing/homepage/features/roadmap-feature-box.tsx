'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2 } from 'lucide-react';

const skeletonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  exit: { scale: 0, opacity: 0 }
};

export default function RoadmapFeatureBox() {
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
    <Card className="group-hover:scale-[1.03] duration-300 rounded-bl-none w-full h-fit lg:max-w-2xl border-black-50 bg-black-75 shadow-md z-50 absolute -right-3 top-24">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4 h-14">
          <AnimatePresence mode="wait">
            {isComplete ? (
              <motion.div
                key="check"
                variants={checkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <CheckCircle2 className="size-16 text-green-500" />
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
                <Skeleton className="h-7 w-[400px] bg-black-50" />
                <Skeleton className="h-7 w-[260px] bg-black-50" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2">
        <motion.h3
          className="text-2xl font-semibold leading-none tracking-tight text-white"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isComplete ? 'Roadmap generated!' : 'Generating your roadmap...'}
        </motion.h3>
        <motion.p
          className="text-base text-muted-foreground"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isComplete
            ? "Your personalized roadmap is ready. Let's explore it together!"
            : "We're working hard to create a roadmap that's perfect for you."}
        </motion.p>
        <Progress
          value={progress}
          className="w-full mt-4"
        />
      </CardFooter>
    </Card>
  );
}
