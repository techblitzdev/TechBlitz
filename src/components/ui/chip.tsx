export default function Chip(opts: {
  text: string;
  color: string;
  textColor?: string;
  small?: boolean;
  ghost?: boolean;
  bold?: boolean;
  border?: string;
}) {
  const {
    text,
    color,
    textColor = 'white',
    small = false,
    ghost = false,
    bold = true,
    border,
  } = opts;

  // !border-accent !border-black-50 border-green-500 border-yellow-500 border-red-500 text-yellow-500 text-red-500

  const baseClasses = small
    ? 'text-[10px] px-1.5 py-0.5 font-ubuntu'
    : 'text-xs px-2 py-1 h-fit';

  // Build classes based on ghost prop
  const colorClasses = ghost
    ? `border border-${color} text-${color} bg-transparent`
    : `bg-${color} text-${textColor}`;

  const boldClasses = bold ? 'font-medium' : '';

  const borderClasses = border
    ? `border !border-${border}`
    : `border !border-${color}`;

  return (
    <span
      className={`${baseClasses} ${colorClasses} ${boldClasses} ${borderClasses} rounded-md`}
    >
      {text}
    </span>
  );
}
