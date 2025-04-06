'use client';

import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface LightbulbIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LightbulbIconProps extends HTMLAttributes<HTMLDivElement> {
  fill?: string;
  strokewidth?: number;
  width?: string | number;
  height?: string | number;
}

const Lightbulb = forwardRef<LightbulbIconHandle, LightbulbIconProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      fill = 'none',
      strokewidth = 2,
      width = '24',
      height = '24',
      ...props
    },
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
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill={fill}
          stroke="currentColor"
          strokeWidth={strokewidth}
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
          {/* Main lightbulb elements */}
          <motion.path
            d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
            variants={{
              normal: {
                fillOpacity: 0,
              },
              animate: {
                fillOpacity: 0.1,
                transition: {
                  duration: 0.5,
                },
              },
            }}
          />
          <path d="M9 18h6" />
          <path d="M10 22h4" />

          {/* Light rays (hidden by default, shown on hover) */}
          <motion.line
            x1="12"
            y1="1"
            x2="12"
            y2="3"
            variants={{
              normal: { opacity: 0, pathLength: 0 },
              animate: {
                opacity: 1,
                pathLength: 1,
                transition: { duration: 0.3, delay: 0.1 },
              },
            }}
          />
          <motion.line
            x1="20"
            y1="4"
            x2="18.5"
            y2="5.5"
            variants={{
              normal: { opacity: 0, pathLength: 0 },
              animate: {
                opacity: 1,
                pathLength: 1,
                transition: { duration: 0.3, delay: 0.15 },
              },
            }}
          />
          <motion.line
            x1="23"
            y1="12"
            x2="21"
            y2="12"
            variants={{
              normal: { opacity: 0, pathLength: 0 },
              animate: {
                opacity: 1,
                pathLength: 1,
                transition: { duration: 0.3, delay: 0.2 },
              },
            }}
          />
          <motion.line
            x1="4"
            y1="12"
            x2="2"
            y2="12"
            variants={{
              normal: { opacity: 0, pathLength: 0 },
              animate: {
                opacity: 1,
                pathLength: 1,
                transition: { duration: 0.3, delay: 0.2 },
              },
            }}
          />
          <motion.line
            x1="5.5"
            y1="5.5"
            x2="4"
            y2="4"
            variants={{
              normal: { opacity: 0, pathLength: 0 },
              animate: {
                opacity: 1,
                pathLength: 1,
                transition: { duration: 0.3, delay: 0.15 },
              },
            }}
          />

          {/* Glow inside bulb (visible on hover) */}
          <motion.circle
            cx="12"
            cy="10"
            r="3"
            fill="currentColor"
            variants={{
              normal: { opacity: 0, scale: 0.8 },
              animate: {
                opacity: 0.3,
                scale: 1,
                transition: {
                  opacity: { duration: 0.5, repeat: 1, repeatType: 'reverse' },
                  scale: { duration: 0.5 },
                },
              },
            }}
          />
        </motion.svg>
      </div>
    );
  }
);

Lightbulb.displayName = 'Lightbulb';

export default Lightbulb;
