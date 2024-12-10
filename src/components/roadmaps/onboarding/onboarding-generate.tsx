import { roadmapGenerate } from '@/actions/roadmap/ai/generate';
import Link from 'next/link';

export default async function RoadmapGenerateButton({
  roadmapUid,
  userUid
}: {
  roadmapUid: string;
  userUid: string;
}) {
  const generate = await roadmapGenerate({
    roadmapUid,
    userUid
  });

  if (generate.length || generate === 'generated') {
    return (
      <Link
        href={`/roadmap/${roadmapUid}`}
        prefetch
        className="bg-accent text-white px-4 py-2 rounded-md text-sm font-semibold font-ubuntu relative z-10"
      >
        Go to Roadmap
      </Link>
    );
  }

  return null;
}
