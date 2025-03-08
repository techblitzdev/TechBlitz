type IconProps = {
  fill?: string;
  secondaryFill?: string;
  strokeWidth?: number;
  width?: string;
  height?: string;
  title?: string;
  glowEffect?: boolean;
  className?: string;
};

function BoltLightning(props: IconProps) {
  const fill = props.fill || '#FFD700'; // Gold color for the stroke
  const secondaryFill = props.secondaryFill || '#FFA500'; // Orange color for the fill
  const strokeWidth = props.strokeWidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'bolt lightning';
  const glowEffect = props.glowEffect !== undefined ? props.glowEffect : true;
  const className = props.className;

  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>{title}</title>
      {glowEffect && (
        <defs>
          <linearGradient id="boltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFF00" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFA500" stopOpacity="1" />
          </linearGradient>
          <filter id="boltGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      )}
      <g fill={fill} filter={glowEffect ? 'url(#boltGlow)' : undefined}>
        <path
          d="M7.25 16.25L9.25 9.25H4.466C4.118 9.25 3.877 8.904 3.997 8.578L6.38 2.078C6.452 1.881 6.64 1.75 6.849 1.75H11.019C11.371 1.75 11.612 2.103 11.485 2.431L10 6.25H13.75C14.162 6.25 14.397 6.72 14.15 7.05L7.25 16.25Z"
          fill={glowEffect ? 'url(#boltGradient)' : secondaryFill}
          fillOpacity="0.8"
          stroke="none"
        />
        <path
          d="M7.25 16.25L9.25 9.25H4.466C4.118 9.25 3.877 8.904 3.997 8.578L6.38 2.078C6.452 1.881 6.64 1.75 6.849 1.75H11.019C11.371 1.75 11.612 2.103 11.485 2.431L10 6.25H13.75C14.162 6.25 14.397 6.72 14.15 7.05L7.25 16.25Z"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
}

export default BoltLightning;
