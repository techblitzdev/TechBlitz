import React from 'react'

type iconProps = {
  fill?: string
  secondaryfill?: string
  strokewidth?: number
  width?: string
  height?: string
  title?: string
}

export default function RoadmapIcon(props: iconProps) {
  const fill = props.fill || 'currentColor'
  const secondaryfill = props.secondaryfill || fill
  const strokewidth = props.strokewidth || 1
  const width = props.width || '1em'
  const height = props.height || '1em'
  const title = props.title || 'timeline vertical 2'

  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g fill={fill}>
        <line
          fill="none"
          stroke={secondaryfill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
          x1="4"
          x2="4"
          y1="17"
          y2="3"
        />
        <circle cx="4" cy="10" fill={secondaryfill} r="2.5" strokeWidth="0" />
        <rect
          height="5"
          width="9"
          fill="none"
          rx="1.5"
          ry="1.5"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
          x="8"
          y="3"
        />
        <rect
          height="5"
          width="9"
          fill="none"
          rx="1.5"
          ry="1.5"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
          x="8"
          y="12"
        />
      </g>
    </svg>
  )
}
