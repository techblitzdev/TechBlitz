import { test } from '@/actions/roadmap/ai/test';

export default async function RoadmapSinglgePage({
  params,
}: {
  params: { roadmapUid: string };
}) {
  const { roadmapUid } = params;

  //const foo = await test();

  return <div>Hello from {roadmapUid}</div>;
}
