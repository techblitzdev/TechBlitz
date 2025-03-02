import React from 'react';

type iconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
};

function Document(props: iconProps) {
  const fill = props.fill || 'white';
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'document';

  return (
    <svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M42,1H6c-.552,0-1,.448-1,1V46c0,.552,.448,1,1,1H42c.552,0,1-.448,1-1V2c0-.552-.448-1-1-1ZM23,41H12c-.552,0-1-.448-1-1s.448-1,1-1h11c.552,0,1,.448,1,1s-.448,1-1,1Zm13-7H12c-.552,0-1-.448-1-1s.448-1,1-1h24c.552,0,1,.448,1,1s-.448,1-1,1Zm0-7H12c-.552,0-1-.448-1-1s.448-1,1-1h24c.552,0,1,.448,1,1s-.448,1-1,1Zm1-8c0,.552-.448,1-1,1H12c-.552,0-1-.448-1-1V8c0-.552,.448-1,1-1h24c.552,0,1,.448,1,1v11Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default Document;
