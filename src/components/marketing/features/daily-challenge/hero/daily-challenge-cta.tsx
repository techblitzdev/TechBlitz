import { Button } from '@/components/ui/button';

export default function DailyChallengeCTA() {
  return (
    <Button
      variant="default"
      className="flex items-center gap-2"
      href={`/questions/study-paths`}
    >
      Explore study paths
    </Button>
  );
}
