'use client';

type CreditCardIconProps = {
  primaryColor?: string;
  secondaryColor?: string;
  strokeWidth?: number;
  width?: string | number;
  height?: string | number;
  className?: string;
  title?: string;
};

export default function CreditCardIcon({
  primaryColor = '#4F46E5', // Indigo color as default
  secondaryColor = '#818CF8', // Lighter indigo for secondary
  strokeWidth = 1.5,
  width = '1.5em',
  height = '1.5em',
  className = '',
  title = 'Credit Card',
}: CreditCardIconProps) {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>{title}</title>
      <g>
        {/* Card body with gradient fill */}
        <path
          d="M3.75 14.25L14.25 14.25C15.3546 14.25 16.25 13.3546 16.25 12.25V5.75C16.25 4.64543 15.3546 3.75 14.25 3.75L3.75 3.75C2.64543 3.75 1.75 4.64543 1.75 5.75L1.75 12.25C1.75 13.3546 2.64543 14.25 3.75 14.25Z"
          fill="url(#cardGradient)"
          stroke={primaryColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />

        {/* Card bottom section */}
        <path
          d="M14.25 14.25H3.75C2.64543 14.25 1.75 13.3546 1.75 12.25V7.25H16.25V12.25C16.25 13.3546 15.3546 14.25 14.25 14.25Z"
          fill={secondaryColor}
          fillOpacity="0.3"
          fillRule="evenodd"
          stroke="none"
        />

        {/* Card stripe */}
        <path
          d="M1.75 7.25H16.25"
          fill="none"
          stroke={primaryColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />

        {/* Card details */}
        <path
          d="M4.25 11.25H7.25"
          fill="none"
          stroke={primaryColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />

        {/* Card chip */}
        <path
          d="M12.75 11.25H13.75"
          fill="none"
          stroke={primaryColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </g>

      {/* Define gradient */}
      <defs>
        <linearGradient
          id="cardGradient"
          x1="1.75"
          y1="3.75"
          x2="16.25"
          y2="14.25"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.1" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
