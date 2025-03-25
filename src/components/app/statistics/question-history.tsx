import { cn } from '@/lib/utils';

interface QuestionHistoryProps {
  className?: string;
}

export default function QuestionHistory({ className }: QuestionHistoryProps) {
  return (
    <section className={cn(className)}>
      <h2 className="text-2xl font-bold">Question History</h2>
    </section>
  );
}
