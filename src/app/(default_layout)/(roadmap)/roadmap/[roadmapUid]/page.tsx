export default function RoadmapSinglgePage({
  params,
}: {
  params: { roadmapUid: string };
}) {
  const { roadmapUid } = params;

  return <div className="">Hello from {roadmapUid}</div>;
}
