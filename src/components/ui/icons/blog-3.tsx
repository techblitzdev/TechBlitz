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

function Blog3(props: iconProps) {
  const strokewidth = props.strokewidth || 2;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'blog 3';
  const className = props.className || '';

  return (
    <svg
      className={cn('text-[#000000] dark:text-white', className)}
      height={height}
      width={width}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g strokeLinecap="butt" strokeLinejoin="miter">
        <rect
          height="28"
          width="24"
          fill="none"
          rx="3"
          ry="3"
          stroke="currentColor"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
          x="4"
          y="2"
        />
        <rect
          height="8"
          width="14"
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
          x="9"
          y="7"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
          x1="9"
          x2="23"
          y1="20"
          y2="20"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
          x1="9"
          x2="23"
          y1="25"
          y2="25"
        />
      </g>
    </svg>
  );
}

export default Blog3;
