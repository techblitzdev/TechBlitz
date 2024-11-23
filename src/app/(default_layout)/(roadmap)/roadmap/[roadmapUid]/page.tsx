import { roadmapGenerate } from '@/actions/roadmap/ai/generate';
import { useUserServer } from '@/hooks/useUserServer';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function RoadmapSinglgePage({
  params,
}: {
  params: { roadmapUid: string };
}) {
  const { roadmapUid } = params;

  // better safe than sorry!
  const user = await useUserServer();
  if (!user) {
    return redirect('/login');
  }

  const generatedPlan = await roadmapGenerate({
    roadmapUid,
    userUid: user.uid,
  });

  return (
    <div className="space-y-10 container">
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
