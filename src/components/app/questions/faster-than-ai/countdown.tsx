'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, Cpu } from 'lucide-react';

interface CountdownProps {
  aiTime: number;
  isVisible: boolean;
  isSubmitted: boolean;
  wasCorrect?: boolean;
}

export default function Countdown({ aiTime, isVisible, isSubmitted, wasCorrect }: CountdownProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());
  const [beatAI, setBeatAI] = useState<boolean | null>(null);

  // Update elapsed time every 100ms
  useEffect(() => {
    if (!isVisible || isSubmitted) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const seconds = (now - startTime) / 1000;
      setElapsedTime(seconds);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, isVisible, isSubmitted]);

  // Determine if user beat AI when submitted
  useEffect(() => {
    if (isSubmitted && wasCorrect !== undefined) {
      setBeatAI(wasCorrect && elapsedTime < aiTime);
    }
  }, [isSubmitted, wasCorrect, elapsedTime, aiTime]);

  if (!isVisible) return null;

  // Calculate progress percentage (how much of AI's time has elapsed)
  const progressPercentage = Math.min((elapsedTime / aiTime) * 100, 100);

  // Determine progress bar class based on time comparison and submission state
  const getProgressColorClass = () => {
    if (isSubmitted) {
      return beatAI ? 'bg-green-500' : 'bg-red-500';
    }

    // Not submitted yet
    if (progressPercentage < 70) return 'bg-green-500';
    if (progressPercentage < 90) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  // Format message based on state
  const getMessage = () => {
    if (isSubmitted) {
      if (beatAI) {
        return `You beat AI by ${(aiTime - elapsedTime).toFixed(1)} seconds!`;
      }
      if (wasCorrect) {
        return `AI was faster by ${(elapsedTime - aiTime).toFixed(1)} seconds`;
      }
      return 'Incorrect answer';
    }

    // Not submitted yet
    const timeLeft = aiTime - elapsedTime;
    if (timeLeft > 0) {
      return `${timeLeft.toFixed(1)} seconds to beat AI`;
    }
    return 'AI would have finished!';
  };

  return (
    <motion.div
      className="fixed top-4 right-4 bg-background border border-border rounded-md p-3 shadow-md z-30 w-64 transition-all duration-200"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-accent" />
          <span className="font-medium">Faster Than AI</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Cpu className="w-3 h-3 text-accent" />
          <span>{aiTime.toFixed(1)}s</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2.5 mb-2 overflow-hidden">
        <motion.div
          className={`h-2.5 rounded-full ${getProgressColorClass()}`}
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{getMessage()}</span>
        <span className="text-sm font-bold text-accent">{elapsedTime.toFixed(1)}s</span>
      </div>
    </motion.div>
  );
}
