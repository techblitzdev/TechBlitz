export default function RoadmapShowcaseBlock({
  title,
  subheader,
}: {
  title?: string;
  subheader?: string;
}) {
  return (
    <section className="container">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-500">{subheader}</p>
    </section>
  );
}
