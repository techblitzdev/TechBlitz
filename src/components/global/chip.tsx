export default function Chip(opts: { text: string; color: string }) {
  const { text, color } = opts;

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold text-white rounded-md bg-${color}`}
    >
      {text}
    </span>
  );
}
