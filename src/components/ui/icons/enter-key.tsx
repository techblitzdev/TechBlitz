export default function EnterKey({
  fill = 'currentColor',
  width = '1em',
  height = '1em',
}: {
  fill?: string;
  strokeWidth?: number;
  width?: string;
  height?: string;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 14 14">
      <g fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round">
        <path d="M.5 10.5h12a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-4" />
        <path d="m3.5 7.5l-3 3l3 3" />
      </g>
    </svg>
  );
}
