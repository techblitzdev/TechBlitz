'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

interface LessonTransitionWrapperProps {
  children: React.ReactNode;
}

export default function LessonTransitionWrapper({ children }: LessonTransitionWrapperProps) {
  const searchParams = useSearchParams();
  const lessonIndex = searchParams?.get('lesson') || '0';
  const [key, setKey] = useState(`lesson-${lessonIndex}`);

  // Update the key when lesson index changes to trigger animation
  useEffect(() => {
    setKey(`lesson-${lessonIndex}`);
  }, [lessonIndex]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
