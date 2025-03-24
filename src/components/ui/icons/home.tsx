import React from 'react';
import { cn } from '@/lib/utils';

type iconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
  className?: string;
};

function Home3(props: iconProps) {
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'home 3';
  const className = props.className || '';

  return (
    <svg
      className={cn('text-black dark:text-white', className)}
      height={height}
      width={width}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g strokeLinecap="butt" strokeLinejoin="miter">
        <polyline
          fill="none"
          points="2 13 16 2 30 13"
          stroke="currentColor"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
        />
        <polyline
          fill="none"
          points="13 29 13 20 19 20 19 29"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
        />
        <path
          d="m5,16v10c0,1.657,1.343,3,3,3h16c1.657,0,3-1.343,3-3v-10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
        />
      </g>
    </svg>
  );
}

export default Home3;
