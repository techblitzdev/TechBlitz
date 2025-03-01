import { cn } from '@/lib/utils';
import React from 'react';

type IconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
  className?: string;
};

function ChatBot({
  fill = '#3B82F6', // Default to a nice blue color
  secondaryfill = '#60A5FA', // Default to a lighter blue
  strokewidth = 1,
  width = '1em',
  height = '1em',
  title = 'chat bot',
  className,
}: IconProps) {
  return (
    <svg
      className={cn(className)}
      height={height}
      width={width}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g fill={fill}>
        <line
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
          x1="7"
          x2="7"
          y1="4"
          y2="7"
        />
        <circle
          cx="7"
          cy="3"
          fill="none"
          r="1"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <circle
          cx="14.5"
          cy="5"
          fill={secondaryfill}
          r="3"
          stroke={secondaryfill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <circle cx="7" cy="11.5" fill={fill} r="1" strokeWidth="0" />
        <circle cx="13" cy="11.5" fill={fill} r="1" strokeWidth="0" />
        <path
          d="m13.475,7.439l-1.414-1.414c-.122-.123-.3-.172-.468-.133-.169.04-.305.164-.359.329l-.707,2.121c-.06.18-.013.378.121.512.095.095.223.146.354.146.053,0,.106-.008.158-.026l2.121-.707c.165-.055.289-.19.329-.359.04-.168-.011-.346-.133-.468Z"
          fill={secondaryfill}
          strokeWidth="0"
        />
        <path
          d="m8.328,7.028c-.003-.009-.504-.019-.507-.028h-1.822c-1.657,0-3,1.343-3,3v4c0,1.657,1.343,3,3,3h8c1.657,0,3-1.343,3-3v-3.24"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <path
          d="m9,13h2c.276,0,.5.224.5.5h0c0,.828-.672,1.5-1.5,1.5h0c-.828,0-1.5-.672-1.5-1.5h0c0-.276.224-.5.5-.5Z"
          fill={fill}
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}

export default ChatBot;
