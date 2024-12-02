import LoadingSpinner from '@/components/ui/loading';

export default function RoadmapFeatureBox() {
  return (
    <div className="bg-black-300 border border-black-50 p-3">
      <div className="flex items-center gap-x-4">
        <LoadingSpinner />
        <p className="font-onest">Generating your roadmap...</p>
      </div>
    </div>
  );
}
