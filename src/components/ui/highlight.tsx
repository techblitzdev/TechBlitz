'use client';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%',
      }}
      animate={{
        backgroundSize: '100% 100%',
      }}
      transition={{
        duration: 2,
        ease: 'anticipate',
        delay: 0.1,
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        `relative inline-block pb-1  px-1 rounded-lg bg-gradient-to-r from-accent to-accent`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
