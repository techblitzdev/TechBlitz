export default function RoadmapQuestionPage({
  params,
}: Readonly<{ params: { roadmapUid: string; uid: string } }>) {
  const { roadmapUid, uid } = params;

  return (
    <div className="space-y-4">
      <h1>Hello from {uid}</h1>
    </div>
  );
}
