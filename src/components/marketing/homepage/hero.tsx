'use client';
import { cn } from '@/utils/cn';
import { useMotionValue, motion, useMotionTemplate } from 'framer-motion';
import React from 'react';

export default function HomepageHero() {
  return (
    <section className="py-32 flex flex-col">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-3xl lg:text-5xl max-w-3xl font-inter !leading-[normal]">
          Your <Highlight>personalized</Highlight> path to master software
          engineering.
        </h1>
        <h6 className="font-inter">
          A fully customisable, end-to-end learning platform for software
          engineers of all abilities.
        </h6>
      </div>
    </section>
  );
}

export const Highlight = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%'
      }}
      animate={{
        backgroundSize: '100% 100%'
      }}
      transition={{
        duration: 2,
        ease: 'linear',
        delay: 0.5
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline'
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
