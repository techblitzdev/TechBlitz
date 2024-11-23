import { roadmapGenerate } from '@/actions/roadmap/ai/generate';
import { test } from '@/actions/roadmap/ai/test';
import { useUserServer } from '@/hooks/useUserServer';
import Link from 'next/link';

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

  return (
    <div className="px-6 space-y-10">
      <div>Hello from {roadmapUid}</div>
      <div className="flex flex-col gap-y-4">
        {generatedPlan?.map((step) => (
          <Link href={`/roadmap/${roadmapUid}/${step.uid}`}>
            {step.question}
          </Link>
        ))}
      </div>
    </div>
  );
}
