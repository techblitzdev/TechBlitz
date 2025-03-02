'use client';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipContent } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Pause } from 'lucide-react';

interface AnimatedStopwatchButtonProps {
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  seconds: number;
  minutes: number;
}

export function AnimatedStopwatchButton({
  isRunning,
  start,
  pause,
  seconds,
  minutes,
}: AnimatedStopwatchButtonProps) {
  const handleClick = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <motion.button
            onClick={handleClick}
            className="relative overflow-hidden bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 border border-black-50 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 font-onest"
            animate={{
              width: isRunning ? 80 : 40,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-center h-[30px] px-2 py-3">
              <AnimatePresence mode="wait">
                {isRunning ? (
                  <motion.div
                    key="running"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <Pause className="size-4 text-gray-400" />
                    <span className="font-onest text-sm">
                      {formatTime(minutes)}:{formatTime(seconds)}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="paused"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Clock className="size-4 text-gray-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent>{isRunning ? 'Pause' : 'Start'}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
