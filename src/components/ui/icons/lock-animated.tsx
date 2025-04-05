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
  fill?: string;
}

export const UilPadlock = forwardRef<LockIconHandle, LockIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 16, fill = 'currentColor', ...props }, ref) => {
    const controls = useAnimation();
    const keyControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          controls.start('animate');
          keyControls.start('animate');
        },
        stopAnimation: () => {
          controls.start('normal');
          keyControls.start('hidden');
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('animate');
          keyControls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, keyControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal');
          keyControls.start('hidden');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, keyControls, onMouseLeave]
    );

    return (
      <div
        className={cn(
          `cursor-pointer select-none transition-colors duration-200 flex items-center justify-center relative`,
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Key - appears from outside and rotates into position */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          initial="hidden"
          animate={keyControls}
          variants={{
            hidden: {
              opacity: 0,
              x: -8,
              y: 4,
              rotate: -45,
              scale: 0.5,
            },
            animate: {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 0.9,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
                duration: 0.5,
              },
            },
          }}
          style={{ position: 'absolute', zIndex: 10 }}
        >
          <path
            fill={fill}
            d="M7,20V11H5V20H3V11A2,2 0 0,1 5,9H7V7A5,5 0 0,1 12,2A5,5 0 0,1 17,7V9A2,2 0 0,1 19,11V20H7M9,9H15V7A3,3 0 0,0 12,4A3,3 0 0,0 9,7V9Z"
          />
        </motion.svg>

        {/* Lock body with shaking/unlocking animation */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          variants={{
            normal: {
              rotate: 0,
              y: 0,
            },
            animate: {
              rotate: [0, -2, 2, -2, 0],
              y: [0, -1, 0],
              transition: {
                rotate: { duration: 0.4, delay: 0.3 },
                y: { duration: 0.3, delay: 0.7 },
              },
            },
          }}
          animate={controls}
        >
          {/* Icon from Unicons by Iconscout - https://github.com/Iconscout/unicons/blob/master/LICENSE */}
          <motion.path
            fill={fill}
            d="M12 13a1.49 1.49 0 0 0-1 2.61V17a1 1 0 0 0 2 0v-1.39A1.49 1.49 0 0 0 12 13"
            variants={{
              normal: { scale: 1, fillOpacity: 1 },
              animate: {
                scale: [1, 0, 0], // Keyhole disappears
                fillOpacity: [1, 0, 0],
                transition: {
                  delay: 0.5,
                  duration: 0.3,
                },
              },
            }}
          />
          <motion.path
            fill={fill}
            d="M17 9V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3zM9 7a3 3 0 0 1 6 0v2H9z"
            variants={{
              normal: { y: 0 },
              animate: {
                y: [0, 0, -2],
                transition: {
                  delay: 0.7,
                  duration: 0.2,
                },
              },
            }}
          />
          <motion.path
            fill={fill}
            d="M17 19H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1z"
            variants={{
              normal: {
                fillOpacity: 1,
                y: 0,
              },
              animate: {
                fillOpacity: [1, 0.8, 1],
                y: [0, 0, -2],
                transition: {
                  fillOpacity: { duration: 0.3, delay: 0.3 },
                  y: { delay: 0.7, duration: 0.2 },
                },
              },
            }}
          />

          {/* Lock opening indicator - appears when unlocked */}
          <motion.path
            fill={fill}
            d="M 12,14 L 12,16.5"
            strokeWidth="2"
            stroke={fill}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            variants={{
              normal: { pathLength: 0, opacity: 0 },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
                transition: {
                  delay: 0.8,
                  duration: 0.3,
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
