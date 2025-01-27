import { Button } from '@/components/ui/button';

export default function DailyChallengeCTA() {
  return (
    <Button
      variant="default"
      className="flex items-center gap-2"
      href={`/study-paths`}
    >
      Explore study paths
    </Button>
  );
}
