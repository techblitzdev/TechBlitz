'use client';

import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface FlagIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FlagIconProps extends HTMLAttributes<HTMLDivElement> {
  fill?: string;
  strokewidth?: number;
  width?: string | number;
  height?: string | number;
}

const FlagIcon = forwardRef<FlagIconHandle, FlagIconProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      fill = 'currentColor',
      strokewidth = 1,
      width = '1em',
      height = '1em',
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const actualFill = fill || 'currentColor';

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(
          `cursor-pointer select-none transition-colors duration-200 flex items-center justify-center`,
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          stroke={actualFill}
          strokeWidth={strokewidth * 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: 1.05,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
          }}
        >
          <motion.path
            d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
            variants={{
              normal: {
                d: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z',
              },
              animate: {
                d: [
                  'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z',
                  'M4 15s1-1.25 4-0.75 5 1.75 8 1.25 4-0.5 4-0.5V3s-1 1-4 0.75-5-1.75-8-1.25-4 0.5-4 0.5z',
                  'M4 15s1-0.75 4-1.25 5 2.25 8 1.75 4-1.5 4-1.5V3s-1 1-4 1.25-5-2.25-8-1.75-4 1.5-4 1.5z',
                  'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z',
                ],
                transition: {
                  duration: 1.2,
                  ease: 'easeInOut',
                  repeat: 1,
                  repeatType: 'reverse',
                },
              },
            }}
          />
          <motion.line
            x1="4"
            x2="4"
            y1="22"
            y2="15"
            variants={{
              normal: {
                y1: 22,
                y2: 15,
              },
              animate: {
                y1: [22, 21.5, 22],
                y2: [15, 14.5, 15],
                transition: {
                  duration: 0.6,
                  ease: 'easeInOut',
                  repeat: 2,
                  repeatType: 'reverse',
                },
              },
            }}
          />
        </motion.svg>
      </div>
    );
  }
);

FlagIcon.displayName = 'FlagIcon';

export default FlagIcon;
