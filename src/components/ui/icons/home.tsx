import React from 'react';

type iconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
};

function Home(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'home';

  return (
    <svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M24,6.876L6,21.6v21.4c0,1.657,1.343,3,3,3h10v-11c0-.552,.448-1,1-1h8c.552,0,1,.448,1,1v11h10c1.657,0,3-1.343,3-3V21.6L24,6.876Z"
          fill={fill}
        />
        <path
          d="M46,22c-.23,0-.454-.08-.632-.226L24,4.292,2.633,21.774c-.433,.343-1.062,.27-1.405-.163-.336-.423-.274-1.037,.139-1.385L23.367,2.226c.368-.301,.898-.301,1.266,0l22,18c.427,.35,.491,.98,.141,1.407-.19,.232-.474,.367-.774,.367Z"
          fill={secondaryfill}
        />
      </g>
    </svg>
  );
}

export default Home;
