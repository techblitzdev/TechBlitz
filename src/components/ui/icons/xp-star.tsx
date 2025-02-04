import type { SVGProps } from 'react';

export default function XpStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <g>
        {/* Star */}
        <path
          d="M128 16l36 72 80 12-58 56 14 80-72-38-72 38 14-80-58-56 80-12z"
          fill="#ffd700"
          stroke="#ffd700"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
      </g>
    </svg>
  );
}
