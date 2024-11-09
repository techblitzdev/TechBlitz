export default function Chip(opts: {
  text: string;
  color: string;
  textColor?: string;
  small?: boolean;
  ghost?: boolean;
}) {
  const {
    text,
    color,
    textColor = 'white',
    small = false,
    ghost = false,
  } = opts;

  const baseClasses = small
    ? 'text-[10px] px-1.5 py-0.5 font-ubuntu'
    : 'text-xs px-2 py-1 font-semibold';

  // Build classes based on ghost prop
  const colorClasses = ghost
    ? `border border-${color} text-${color} bg-transparent`
    : `bg-${color} text-${textColor}`;

  return (
    <span className={`${baseClasses} ${colorClasses} rounded-md`}>{text}</span>
  );
}
