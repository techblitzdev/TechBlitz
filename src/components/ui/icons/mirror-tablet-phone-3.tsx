type IconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
};

function MirrorTabletPhone3(props: IconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'mirror tablet phone 3';

  return (
    <svg height={height} width={width} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M29.5,13h-11c-1.381,0-2.5,1.119-2.5,2.5v14c0,1.381,1.119,2.5,2.5,2.5h11.5c1.105,0,2-.895,2-2V15.5c0-1.381-1.119-2.5-2.5-2.5Zm.5,15.5c0,.276-.224,.5-.5,.5h-11c-.276,0-.5-.224-.5-.5V15.5c0-.276,.224-.5,.5-.5h11c.276,0,.5,.224,.5,.5v13Z"
          fill={secondaryfill}
        />
        <path
          d="M2,23.5V2.5c0-.276,.224-.5,.5-.5H21.5c.276,0,.5,.224,.5,.5V11h2V2.5c0-1.381-1.119-2.5-2.5-2.5H2.5C1.119,0,0,1.119,0,2.5V25.5c0,1.381,1.119,2.5,2.5,2.5H14v-4H2.5c-.276,0-.5-.224-.5-.5Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default MirrorTabletPhone3;
