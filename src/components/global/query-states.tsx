import LoadingSpinner from '@/components/ui/loading';

interface QueryStatesProps {
  isLoading: boolean;
  isError: boolean;
  error: { message: string } | null;
  userLoading: boolean;
  userError: boolean;
}

export default function QueryStates(states: QueryStatesProps) {
  const { isLoading, isError, error, userError, userLoading } = states;
  if (userError) {
    return <div>Error loading user</div>;
  }

  if (isLoading || userLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
}
