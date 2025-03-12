import React from 'react';

type iconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
};

function GraduationCap(props: iconProps) {
  // Define default colors for a realistic graduation cap
  const fill = props.fill || '#333333'; // Dark gray/black for outline and details
  const secondaryfill = props.secondaryfill || '#222222'; // Slightly darker for the cap fill
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'graduation cap';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g>
        {/* Cap fill with realistic black/dark gray */}
        <path
          d="M9.45799 2.361L15.79 5.621C16.403 5.937 16.403 6.813 15.79 7.129L9.45799 10.389C9.16999 10.537 8.82899 10.537 8.54199 10.389L2.20999 7.129C1.59699 6.813 1.59699 5.937 2.20999 5.621L8.54199 2.361C8.82999 2.213 9.17099 2.213 9.45799 2.361Z"
          fill={secondaryfill}
          stroke="none"
        />

        {/* Cap outline */}
        <path
          d="M9.45799 2.361L15.79 5.621C16.403 5.937 16.403 6.813 15.79 7.129L9.45799 10.389C9.16999 10.537 8.82899 10.537 8.54199 10.389L2.20999 7.129C1.59699 6.813 1.59699 5.937 2.20999 5.621L8.54199 2.361C8.82999 2.213 9.17099 2.213 9.45799 2.361Z"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />

        {/* Tassel string - same color as outline for realism */}
        <path
          d="M16.25 6.375C16.079 7.115 15.932 8.097 15.969 9.25C15.996 10.084 16.113 10.812 16.25 11.406"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />

        {/* Gown/lower part */}
        <path
          d="M4.25 10.75V14C4.25 15.104 6.377 16 9 16C11.623 16 13.75 15.104 13.75 14V10.75"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />

        {/* Add subtle highlight on top of cap */}
        <path
          d="M5.5 6L9 7.75L12.5 6"
          fill="none"
          stroke="#555555"
          strokeOpacity="0.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth * 0.5}
        />
      </g>
    </svg>
  );
}

export default GraduationCap;
