import LoadingSpinner from '@/components/ui/loading';

export default async function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <LoadingSpinner />
    </div>
  );
}
