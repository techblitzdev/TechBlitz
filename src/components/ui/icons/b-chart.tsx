import React from 'react';

type iconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
};

function BChart(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'b chart';

  return (
    <svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path d="M46,42H2a1,1,0,0,0,0,2H46a1,1,0,0,0,0-2Z" fill={secondaryfill} />
        <rect height="20" width="10" fill={fill} rx="1" x="4" y="18" />
        <rect height="34" width="10" fill={fill} rx="1" x="19" y="4" />
        <rect height="12" width="10" fill={fill} rx="1" x="34" y="26" />
      </g>
    </svg>
  );
}

export default BChart;
