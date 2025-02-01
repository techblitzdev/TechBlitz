import { CheckCircle } from 'lucide-react';
import RoadmapIcon from '@/components/ui/icons/roadmap';

interface RoadmapStatusProps {
  isGenerated: boolean;
}

export default function RoadmapStatus({ isGenerated }: RoadmapStatusProps) {
  return (
    <div className="text-center flex flex-col items-center">
      {isGenerated ? (
        <CheckCircle className="size-12 text-green-400" aria-hidden="true" />
      ) : (
        <RoadmapIcon width="64" height="64" aria-hidden="true" />
      )}
      <h1 className="text-3xl font-bold text-white mb-2">
        {isGenerated ? 'Your Roadmap is Ready' : 'Generating Your Roadmap'}
      </h1>
      <p className="text-sm text-gray-400 max-w-md">
        {isGenerated
          ? 'Your roadmap is ready to be viewed. Click the button below to start your coding journey!'
          : 'This process may take a few minutes. Please hold tight while we prepare your personalized learning journey.'}
      </p>
    </div>
  );
}
