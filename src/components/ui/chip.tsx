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

  const baseClasses = small ? 'text-[10px] px-1.5 py-0.5 font-onest' : 'text-xs px-2 py-1 h-fit';

  // Build classes based on ghost prop
  const colorClasses = ghost ? `${color} ${textColor} bg-transparent` : `${color} ${textColor}`;

  const boldClasses = bold ? 'font-medium' : '';

  const borderClasses = border || color;

  return (
    <span
      className={`${baseClasses} ${colorClasses} ${boldClasses} border ${borderClasses} rounded-md`}
    >
      {text}
    </span>
  );
}
