'use client';

import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface AwardIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AwardIconProps extends HTMLAttributes<HTMLDivElement> {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string | number;
  height?: string | number;
  title?: string;
}

const Award = forwardRef<AwardIconHandle, AwardIconProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      fill = 'currentColor',
      secondaryfill,
      strokewidth = 1,
      width = '1em',
      height = '1em',
      title = 'award',
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const secondaryFill = secondaryfill || fill;

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
          height={height}
          width={width}
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          variants={{
            normal: { rotate: 0, scale: 1 },
            animate: { rotate: [-5, 5, 0], scale: 1.1, transition: { duration: 0.5 } },
          }}
          animate={controls}
        >
          <title>{title}</title>
          <g fill={fill}>
            <path
              d="M9.643,12.133l.777-.652c.18-.151,.408-.234,.643-.234h1.014c.485,0,.901-.348,.985-.826l.176-.999c.041-.232,.162-.441,.342-.592l.777-.652c.372-.312,.466-.846,.223-1.266l-.507-.879c-.118-.204-.16-.442-.119-.674l.176-.999c.084-.478-.187-.947-.643-1.113l-.953-.347c-.221-.08-.406-.236-.524-.44l-.507-.879c-.243-.42-.752-.606-1.208-.44l-.953,.347c-.221,.08-.463,.08-.684,0l-.953-.347c-.456-.166-.965,.019-1.208,.44l-.507,.879c-.118,.204-.303,.359-.524,.44l-.953,.347c-.456,.166-.727,.635-.643,1.113l.176,.999c.041,.232-.001,.47-.119,.674l-.507,.879c-.243,.42-.149,.954,.223,1.266l.777,.652c.18,.151,.301,.361,.342,.592l.176,.999c.084,.478,.5,.826,.985,.826h1.014c.235,0,.463,.083,.643,.234l.777,.652c.372,.312,.914,.312,1.286,0Z"
              fill="none"
              stroke={fill}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={strokewidth}
            />
            <motion.polyline
              fill="none"
              points="12.25 13.75 12.25 17.25 9 14.75 5.75 17.25 5.75 13.75"
              stroke={secondaryFill}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={strokewidth}
              variants={{
                normal: { y: 0 },
                animate: { y: [-1, 1, 0], transition: { delay: 0.2, duration: 0.3 } },
              }}
            />
            <motion.circle
              cx="9"
              cy="6.724"
              fill="none"
              r="2"
              stroke={secondaryFill}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={strokewidth}
              variants={{
                normal: { scale: 1 },
                animate: { scale: [1, 1.2, 1], transition: { delay: 0.1, duration: 0.4 } },
              }}
            />
          </g>
        </motion.svg>
      </div>
    );
  }
);

Award.displayName = 'Award';

export default Award;
