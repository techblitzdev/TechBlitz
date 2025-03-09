import React from 'react';

type iconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
};

function Award(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'award';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M9.643,12.133l.777-.652c.18-.151,.408-.234,.643-.234h1.014c.485,0,.901-.348,.985-.826l.176-.999c.041-.232,.162-.441,.342-.592l.777-.652c.372-.312,.466-.846,.223-1.266l-.507-.879c-.118-.204-.16-.442-.119-.674l.176-.999c.084-.478-.187-.947-.643-1.113l-.953-.347c-.221-.08-.406-.236-.524-.44l-.507-.879c-.243-.42-.752-.606-1.208-.44l-.953,.347c-.221,.08-.463,.08-.684,0l-.953-.347c-.456-.166-.965,.019-1.208,.44l-.507,.879c-.118,.204-.303,.359-.524,.44l-.953,.347c-.456,.166-.727,.635-.643,1.113l.176,.999c.041,.232-.001,.47-.119,.674l-.507,.879c-.243,.42-.149,.954,.223,1.266l.777,.652c.18,.151,.301,.361,.342,.592l.176,.999c.084,.478,.5,.826,.985,.826h1.014c.235,0,.463,.083,.643,.234l.777,.652c.372,.312,.914,.312,1.286,0Z"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <polyline
          fill="none"
          points="12.25 13.75 12.25 17.25 9 14.75 5.75 17.25 5.75 13.75"
          stroke={secondaryfill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <circle
          cx="9"
          cy="6.724"
          fill="none"
          r="2"
          stroke={secondaryfill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
      </g>
    </svg>
  );
}

export default Award;
