import React from 'react';

type iconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
};

function Check(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'check';

  return (
    <svg height={height} width={width} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill} strokeLinecap="butt" strokeLinejoin="miter">
        <polyline
          fill="none"
          points="3 13 8 19 21 5"
          stroke={fill}
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
        />
      </g>
    </svg>
  );
}

export default Check;
