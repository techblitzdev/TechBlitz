import type { SVGProps } from 'react';

export default function ChallengeFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <g>
        {/* Flag pole */}
        <path
          d="M56 40v176"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
        {/* Flag */}
        <path
          d="M56 72c32-24 96 24 128 0v80c-32 24-96-24-128 0"
          fill="none"
          stroke="#ffd700"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
        {/* Checkered pattern */}
        <path
          d="M80 72h24v24H80zM128 72h24v24h-24zM104 96h24v24h-24zM152 96h24v24h-24z"
          fill="#ffd700"
        />
      </g>
    </svg>
  );
}
