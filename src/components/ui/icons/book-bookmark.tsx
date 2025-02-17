import React from 'react';

type IconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
};

function BookBookmark(props: IconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'book bookmark';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g>
        <path
          d="M11,14H7v3.5c0,.202,.122,.385,.309,.462,.187,.079,.401,.035,.545-.108l1.146-1.146,1.146,1.146c.096,.096,.224,.146,.354,.146,.064,0,.13-.012,.191-.038,.187-.077,.309-.26,.309-.462v-3.5Z"
          fill={secondaryfill}
        />
        <path
          d="M15.994,12.25h.006V2.25c0-.414-.336-.75-.75-.75H4.75c-1.517,0-2.75,1.233-2.75,2.75V14c0,1.378,1.122,2.5,2.5,2.5h.75c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75h-.75c-.551,0-1-.449-1-1s.449-1,1-1H14.106c-.155,.629-.174,1.339-.014,2h-1.342c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h2.5c.286,0,.547-.163,.673-.419,.126-.256,.096-.562-.079-.789-.523-.679-.434-2.013,.003-2.589,.101-.133,.146-.293,.146-.454Zm-10.244-1.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75,.75,.336,.75,.75-.336,.75-.75,.75Zm0-2.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75,.75,.336,.75,.75-.336,.75-.75,.75Zm0-2.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75,.75,.336,.75,.75-.336,.75-.75,.75Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default BookBookmark;
