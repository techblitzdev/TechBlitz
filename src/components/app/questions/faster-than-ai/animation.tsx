'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Zap, Timer, Cpu } from 'lucide-react';

interface FasterThanAIAnimationProps {
  aiTime?: number; // Time taken by AI (in seconds)
  onComplete: () => void;
}

export default function FasterThanAIAnimation({ aiTime, onComplete }: FasterThanAIAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss after 5 seconds or when user clicks "Start Challenge"
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Allow exit animation to complete
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  const handleStartClick = () => {
    setIsVisible(false);
    setTimeout(onComplete, 500); // Allow exit animation to complete
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        when: 'afterChildren',
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        '0 0 20px rgba(0, 0, 0, 0.3)',
        '0 0 30px rgba(0, 0, 0, 0.5)',
        '0 0 20px rgba(0, 0, 0, 0.3)',
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'loop' as const,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black/80 backdrop-blur-md p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="max-w-[500px] w-full text-center flex flex-col items-center gap-6">
            <motion.h1
              className="text-4xl font-extrabold text-accent sm:text-5xl"
              variants={itemVariants}
            >
              Faster Than AI Mode
            </motion.h1>

            <motion.div
              className="relative w-28 h-28 rounded-full bg-accent flex items-center justify-center shadow-lg"
              variants={pulseVariants}
              animate="pulse"
            >
              <Zap size={60} className="text-white" />
            </motion.div>

            <motion.p className="text-xl text-white md:text-2xl font-onest" variants={itemVariants}>
              Race against the clock! Can you answer faster than ChatGPT?
            </motion.p>

            {aiTime && (
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-center gap-2 text-white">
                  <Cpu size={20} />
                  <span>AI solved this in:</span>
                </div>
                <div className="text-2xl font-semibold text-accent mt-1">
                  <span>{aiTime} seconds</span>
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <button
                className="px-8 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent/90 hover:-translate-y-0.5 active:translate-y-0.5 transition-all shadow-lg hover:shadow-xl mt-4"
                onClick={handleStartClick}
              >
                Start Challenge
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
