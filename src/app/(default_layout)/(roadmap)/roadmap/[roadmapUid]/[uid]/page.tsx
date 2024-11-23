import { fetchRoadmapQuestion } from '@/actions/roadmap/questions/fetch-roadmap-question';

export default async function RoadmapQuestionPage({
  params,
}: Readonly<{ params: { roadmapUid: string; uid: string } }>) {
  const { roadmapUid, uid } = params;

  // grab the question from the db
  const quesiton = await fetchRoadmapQuestion(uid);

  return (
    <div className="space-y-4">
      <h1 className="whitespace-pre">
        Hello from {JSON.stringify(quesiton, null, 2)}
      </h1>
    </div>
  );
}
