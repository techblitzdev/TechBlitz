'use client';

import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface Blog3IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Blog3Props extends HTMLAttributes<HTMLDivElement> {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string | number;
  height?: string | number;
  title?: string;
}

const Blog3 = forwardRef<Blog3IconHandle, Blog3Props>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      fill = 'white',
      secondaryfill,
      strokewidth = 2,
      width = '1em',
      height = '1em',
      title = 'blog 3',
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
          className="text-white"
          height={height}
          width={width}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
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
          <title>{title}</title>
          <g fill={fill} strokeLinecap="butt" strokeLinejoin="miter">
            <motion.rect
              height="28"
              width="24"
              fill="none"
              rx="3"
              ry="3"
              stroke="white"
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeWidth={strokewidth}
              x="4"
              y="2"
              variants={{
                normal: {
                  pathLength: 1,
                },
                animate: {
                  pathLength: [1, 0.9, 1],
                  transition: {
                    duration: 0.8,
                    ease: 'easeInOut',
                  },
                },
              }}
            />
            <motion.rect
              height="8"
              width="14"
              fill="none"
              stroke="white"
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeWidth={strokewidth}
              x="9"
              y="7"
              variants={{
                normal: {
                  pathLength: 1,
                },
                animate: {
                  pathLength: [1, 0.8, 1],
                  transition: {
                    duration: 0.5,
                    delay: 0.1,
                  },
                },
              }}
            />
            <motion.line
              fill="none"
              stroke="white"
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeWidth={strokewidth}
              x1="9"
              x2="23"
              y1="20"
              y2="20"
              variants={{
                normal: {
                  pathLength: 1,
                  x1: 9,
                  x2: 23,
                },
                animate: {
                  pathLength: [1, 0, 1],
                  x1: [9, 9, 9],
                  x2: [23, 9, 23],
                  transition: {
                    duration: 0.7,
                    delay: 0.3,
                  },
                },
              }}
            />
            <motion.line
              fill="none"
              stroke="white"
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeWidth={strokewidth}
              x1="9"
              x2="23"
              y1="25"
              y2="25"
              variants={{
                normal: {
                  pathLength: 1,
                  x1: 9,
                  x2: 23,
                },
                animate: {
                  pathLength: [1, 0, 1],
                  x1: [9, 9, 9],
                  x2: [23, 9, 23],
                  transition: {
                    duration: 0.7,
                    delay: 0.5,
                  },
                },
              }}
            />
          </g>
        </motion.svg>
      </div>
    );
  }
);

Blog3.displayName = 'Blog3';

export default Blog3;
