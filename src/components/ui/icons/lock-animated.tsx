'use client';

import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface LockIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LockIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  stroke?: string;
}

export const UilPadlock = forwardRef<LockIconHandle, LockIconProps>(
  (
    { onMouseEnter, onMouseLeave, className, size = 16, stroke = 'currentColor', ...props },
    ref
  ) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

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
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Lock body */}
          <motion.rect
            x="4"
            y="11"
            width="16"
            height="10"
            rx="2"
            ry="2"
            fill="none"
            stroke={stroke}
            variants={{
              normal: {
                y: 11,
                opacity: 1,
              },
              animate: {
                y: [11, 11.5, 11],
                opacity: [1, 0.8, 1],
                transition: {
                  duration: 0.7,
                  times: [0, 0.3, 1],
                },
              },
            }}
          />

          {/* Lock shackle - the part that moves */}
          <motion.path
            d="M8 11V7a4 4 0 0 1 8 0v4"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
            variants={{
              normal: {
                d: 'M8 11V7a4 4 0 0 1 8 0v4',
                y: 0,
              },
              animate: {
                d: [
                  'M8 11V7a4 4 0 0 1 8 0v4', // closed
                  'M8 11V7a4 4 0 0 1 8 0v4', // still closed
                  'M8 11V10a4 4 0 0 1 8 0v1', // moving up
                  'M8 7.5V7a4 4 0 0 1 8 0v0.5', // opened position
                  'M8 8.5V7a4 4 0 0 1 8 0v1.5', // start moving down
                  'M8 11V7a4 4 0 0 1 8 0v4', // back to closed
                ],
                transition: {
                  duration: 1.2,
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  ease: 'easeInOut',
                },
              },
            }}
          />

          {/* Keyhole */}
          <motion.circle
            cx="12"
            cy="16"
            r="1"
            variants={{
              normal: {
                scale: 1,
                opacity: 1,
              },
              animate: {
                scale: [1, 1.5, 0.8, 1],
                opacity: [1, 0.7, 1, 1],
                transition: {
                  duration: 0.8,
                  times: [0, 0.4, 0.7, 1],
                },
              },
            }}
          />

          {/* Key that appears */}
          <motion.path
            d="M15.5 11.5L12 15l-3.5-3.5"
            stroke={stroke}
            strokeWidth="1.5"
            variants={{
              normal: {
                opacity: 0,
                pathLength: 0,
                rotate: 0,
              },
              animate: {
                opacity: [0, 1, 1, 0],
                pathLength: [0, 1, 1, 0],
                rotate: [0, 90, 180, 180],
                transition: {
                  duration: 1,
                  times: [0.2, 0.4, 0.7, 0.9],
                },
              },
            }}
          />
        </motion.svg>
      </div>
    );
  }
);

UilPadlock.displayName = 'UilPadlock';
