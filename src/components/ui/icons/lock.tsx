type IconProps = {
  primaryColor?: string;
  secondaryColor?: string;
  width?: string;
  height?: string;
  title?: string;
};

function Lock({
  primaryColor = '#EAB308',
  secondaryColor = '#FEF08A',
  width = '1em',
  height = '1em',
  title = 'lock',
}: IconProps) {
  return (
    <svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>
      <g>
        <path d="M35,18H33V12a9,9,0,1,0-18,0v6H13V12a11,11,0,0,1,22,0Z" fill={primaryColor} />
        <path
          d="M40,20H8a3,3,0,0,0-3,3V44a3,3,0,0,0,3,3H40a3,3,0,0,0,3-3V23A3,3,0,0,0,40,20ZM25,35.9V40a1,1,0,0,1-2,0V35.9a5,5,0,1,1,2,0Z"
          fill="url(#lockGradient)"
        />
      </g>
    </svg>
  );
}

export default Lock;
