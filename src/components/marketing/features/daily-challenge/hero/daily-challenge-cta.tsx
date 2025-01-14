import { Button } from '@/components/ui/button';
import { getTodaysQuestion } from '@/utils/data/questions/get-today';

export default async function DailyChallengeCTA() {
  const dailyQuestion = await getTodaysQuestion();

  return (
    <Button
      variant="default"
      className="flex items-center gap-2"
      href={`/question/${dailyQuestion?.slug}`}
    >
      Answer today's challenge
    </Button>
  );
}
