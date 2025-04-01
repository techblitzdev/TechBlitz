export default function DeleteKey({
  fill = 'currentColor',
  width = '1em',
  height = '1em',
}: {
  fill?: string;
  width?: string;
  height?: string;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 48 48">
      <path
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M18.424 10.538A2 2 0 0 1 19.788 10H42a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H19.788a2 2 0 0 1-1.364-.538L4 24zM36 19L26 29m0-10l10 10"
      />
    </svg>
  );
}
