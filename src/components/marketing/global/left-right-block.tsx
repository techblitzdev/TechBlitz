export default function LeftRightBlock(opts: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  const { left, right } = opts;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <div className="col-span-6">{left}</div>
      <div className="col-span-6">{right}</div>
    </section>
  );
}
