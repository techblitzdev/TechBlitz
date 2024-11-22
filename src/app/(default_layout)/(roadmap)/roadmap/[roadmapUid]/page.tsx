import { roadmapGenerate } from '@/actions/roadmap/ai/generate';
import { test } from '@/actions/roadmap/ai/test';
import { useUserServer } from '@/hooks/useUserServer';

export default async function RoadmapSinglgePage({
  params,
}: {
  params: { roadmapUid: string };
}) {
  const { roadmapUid } = params;

  const user = await useUserServer();
  if (!user) {
    return <div>Not logged in</div>;
  }

  const generatedPlan = await roadmapGenerate({
    roadmapUid,
    userUid: user.uid,
  });

  if (generatedPlan === 'invalid') {
    return <div>Invalid</div>;
  }

  return (
    <div className="px-6 space-y-10">
      <div>Hello from {roadmapUid}</div>
      <pre className="text-wrap">
        {generatedPlan.content &&
          JSON.stringify(JSON.parse(generatedPlan.content), null, 2)}
      </pre>
    </div>
  );
}