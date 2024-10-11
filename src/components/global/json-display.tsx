export default function JsonDisplay(opts: { data: any }) {
  return (
    <div className="selection:bg-white selection:text-black-50 rounded-md bg-black text-white whitespace-pre-wrap p-2 relative overflow-scroll">
      {JSON.stringify(opts.data, null, 2)}
    </div>
  );
}
