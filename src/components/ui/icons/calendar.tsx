type IconProps = {
  fill?: string;
  secondaryfill?: string;
  accentfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
};

function Calendar(props: IconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || '#f1f5f9';
  const accentfill = props.accentfill || '#ef4444';
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'calendar';

  return (
    <svg height={height} width={width} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>

      <defs>
        {/* Shadow filter */}
        <filter id="calendarShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.3" floodColor="rgba(0,0,0,0.3)" />
        </filter>

        {/* Gradient for header */}
        <linearGradient id="headerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accentfill} />
          <stop offset="100%" stopColor={`${accentfill}dd`} />
        </linearGradient>

        {/* Subtle gradient for body */}
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={secondaryfill} />
          <stop offset="100%" stopColor={`${secondaryfill}ee`} />
        </linearGradient>
      </defs>

      {/* Main calendar body with rounded corners and shadow */}
      <rect
        height="18"
        width="20"
        fill="url(#bodyGradient)"
        rx="2"
        ry="2"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokewidth}
        x="2"
        y="3"
        filter="url(#calendarShadow)"
      />

      {/* Calendar header */}
      <rect
        height="4"
        width="20"
        fill="url(#headerGradient)"
        rx="2"
        ry="2"
        x="2"
        y="3"
        stroke={fill}
        strokeWidth={strokewidth}
        strokeLinejoin="round"
      />

      {/* Bottom part of header to create a straight bottom edge */}
      <rect height="2" width="20" fill="url(#headerGradient)" x="2" y="5" strokeWidth="0" />

      {/* Calendar hangers */}
      <line
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={strokewidth}
        x1="7"
        x2="7"
        y1="1"
        y2="5"
      />
      <line
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={strokewidth}
        x1="17"
        x2="17"
        y1="1"
        y2="5"
      />

      {/* Calendar grid lines - horizontal */}
      <line
        fill="none"
        stroke={`${fill}33`}
        strokeMiterlimit="10"
        strokeWidth={strokewidth * 0.5}
        x1="3"
        x2="21"
        y1="11"
        y2="11"
      />
      <line
        fill="none"
        stroke={`${fill}33`}
        strokeMiterlimit="10"
        strokeWidth={strokewidth * 0.5}
        x1="3"
        x2="21"
        y1="15"
        y2="15"
      />

      {/* Calendar grid lines - vertical */}
      <line
        fill="none"
        stroke={`${fill}33`}
        strokeMiterlimit="10"
        strokeWidth={strokewidth * 0.5}
        x1="6.5"
        x2="6.5"
        y1="8"
        y2="20"
      />
      <line
        fill="none"
        stroke={`${fill}33`}
        strokeMiterlimit="10"
        strokeWidth={strokewidth * 0.5}
        x1="10.5"
        x2="10.5"
        y1="8"
        y2="20"
      />
      <line
        fill="none"
        stroke={`${fill}33`}
        strokeMiterlimit="10"
        strokeWidth={strokewidth * 0.5}
        x1="14.5"
        x2="14.5"
        y1="8"
        y2="20"
      />
      <line
        fill="none"
        stroke={`${fill}33`}
        strokeMiterlimit="10"
        strokeWidth={strokewidth * 0.5}
        x1="18.5"
        x2="18.5"
        y1="8"
        y2="20"
      />

      {/* Calendar date numbers */}
      <text x="4.2" y="10" fontSize="2" fill={fill} fontWeight="bold">
        1
      </text>
      <text x="8.2" y="10" fontSize="2" fill={fill}>
        2
      </text>
      <text x="12.2" y="10" fontSize="2" fill={fill}>
        3
      </text>
      <text x="16.2" y="10" fontSize="2" fill={fill}>
        4
      </text>

      <text x="4.2" y="14" fontSize="2" fill={fill}>
        5
      </text>
      <text x="8.2" y="14" fontSize="2" fill={fill}>
        6
      </text>
      <text x="12.2" y="14" fontSize="2" fill={fill}>
        7
      </text>
      <text x="16.2" y="14" fontSize="2" fill={fill}>
        8
      </text>

      <text x="4.2" y="18" fontSize="2" fill={fill}>
        9
      </text>
      <text x="8" y="18" fontSize="2" fill={fill}>
        10
      </text>
      <text x="12" y="18" fontSize="2" fill={fill}>
        11
      </text>
      <text x="16" y="18" fontSize="2" fill={fill}>
        12
      </text>

      {/* Highlight for today's date */}
      <circle cx="4.7" cy="9" r="1.3" fill={accentfill} opacity="0.3" />
    </svg>
  );
}

export default Calendar;
