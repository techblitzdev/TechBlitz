type IconProps = {
  width?: string;
  height?: string;
  title?: string;
};

function Spaceship2({ width = '1em', height = '1em', title = 'Spaceship' }: IconProps) {
  return (
    <svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <linearGradient id="spaceshipBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D1D1D1" />
          <stop offset="50%" stopColor="#A9A9A9" />
          <stop offset="100%" stopColor="#808080" />
        </linearGradient>
        <radialGradient id="spaceshipWindow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#87CEFA" />
          <stop offset="100%" stopColor="#1E90FF" />
        </radialGradient>
      </defs>
      <g strokeLinecap="round" strokeLinejoin="round">
        <line stroke="#FF4500" strokeWidth="2" x1="29.769" x2="41.866" y1="6.086" y2="18.182" />
        <path
          d="M24.831,8.965C18.989,6.449,11.5,8,6,15l6.734,6.736"
          stroke="#FF4500"
          strokeWidth="2"
        />
        <path
          d="M39.035,23.169C41.551,29.011,40,36.5,33,42l-6.736-6.734"
          stroke="#FF4500"
          strokeWidth="2"
        />
        <path
          d="M21,38,10,27S18.894,3.414,46,2C44.468,28.988,21,38,21,38Z"
          fill="url(#spaceshipBody)"
          stroke="#696969"
          strokeWidth="2"
        />
        <path
          d="M4.464,36.464a5,5,0,0,1,7.072,7.072C9.583,45.488,2,46,2,46S2.512,38.417,4.464,36.464Z"
          fill="#C0C0C0"
          stroke="#696969"
          strokeWidth="2"
        />
        <circle
          cx="27"
          cy="21"
          r="4"
          fill="url(#spaceshipWindow)"
          stroke="#4682B4"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

export default Spaceship2;
