type IconProps = {
  width?: string;
  height?: string;
  title?: string;
};

function ArcheryTarget({ width = '1em', height = '1em', title = 'Archery Target' }: IconProps) {
  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#DC143C" />
        </linearGradient>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4169E1" />
          <stop offset="100%" stopColor="#0000CD" />
        </linearGradient>
        <linearGradient id="blackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2C3E50" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
      <g>
        <circle cx="9" cy="9" r="8" fill="url(#blackGradient)" />
        <circle cx="9" cy="9" r="6.4" fill="url(#blueGradient)" />
        <circle cx="9" cy="9" r="4.8" fill="url(#redGradient)" />
        <circle cx="9" cy="9" r="3.2" fill="url(#goldGradient)" />
        <circle cx="9" cy="9" r="1.6" fill="#FFFFFF" />

        <path
          d="M17.693,2.963c-.116-.28-.39-.463-.693-.463h-1.5V1c0-.303-.183-.577-.463-.693-.28-.117-.603-.052-.817,.163l-2.5,2.5c-.141,.141-.22,.332-.22,.53v1.939l-3.03,3.03c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l3.03-3.03h1.939c.199,0,.39-.079,.53-.22l2.5-2.5c.215-.214,.278-.537,.163-.817Z"
          fill="url(#goldGradient)"
        />
      </g>
    </svg>
  );
}

export default ArcheryTarget;
