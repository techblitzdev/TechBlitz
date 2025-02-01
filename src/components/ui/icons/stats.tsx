import React from "react";

type iconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
};

export default function StatsIcon(props: iconProps) {
  const fill = props.fill || "currentColor";
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || "1em";
  const height = props.height || "1em";
  const title = props.title || "b chart 3";

  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g fill={fill} strokeLinecap="butt" strokeLinejoin="miter">
        <line
          fill="none"
          stroke={secondaryfill}
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
          x1="2"
          x2="30"
          y1="29"
          y2="29"
        />
        <rect
          height="12"
          width="6"
          fill="none"
          stroke={fill}
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
          x="3"
          y="13"
        />
        <rect
          height="22"
          width="6"
          fill="none"
          stroke={fill}
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
          x="13"
          y="3"
        />
        <rect
          height="7"
          width="6"
          fill="none"
          stroke={fill}
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth={strokewidth}
          x="23"
          y="18"
        />
      </g>
    </svg>
  );
}
