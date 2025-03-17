import React from 'react';

type iconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
};

function Home3(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'home 3';

  return (
    <svg height={height} width={width} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill} strokeLinecap="butt" strokeLinejoin="miter">
        <polyline
          fill="none"
          points="2 13 16 2 30 13"
          stroke={fill}
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
        />
        <polyline
          fill="none"
          points="13 29 13 20 19 20 19 29"
          stroke={secondaryfill}
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
        />
        <path
          d="m5,16v10c0,1.657,1.343,3,3,3h16c1.657,0,3-1.343,3-3v-10"
          fill="none"
          stroke={fill}
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
        />
      </g>
    </svg>
  );
}

export default Home3;
