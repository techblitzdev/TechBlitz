'use client';
import { motion } from 'framer-motion';
import React from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ChallengeListClient({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants} className="space-y-6">
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
