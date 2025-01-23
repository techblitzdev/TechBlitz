import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { getSuggestions } from '@/utils/data/questions/get-suggestions';

export default async function ContinueJourney() {
  const suggestions = await getSuggestions({
    limit: 1,
  });

  return (
    <Button
      href={`/question/${suggestions?.[0]?.slug}`}
      variant="accent"
      className="flex items-center gap-2"
    >
      <span className="hidden md:block">Continue your journey</span>
      <span className="block md:hidden">Continue</span>
      <ArrowRightIcon className="w-4 h-4" />
    </Button>
  );
}
