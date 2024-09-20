import { Button } from '@/components/ui/button';
import type { Questions } from '@prisma/client';
import AdminQuestionCard from './question-card';

export default function AdminQuestionToday({
  question,
}: {
  question: Questions;
}) {
  return (
    <div className="flex flex-col gap-y-2 w-full items-center">
      <Button className="w-fit">Todays Question</Button>
      <AdminQuestionCard question={question} />
    </div>
  );
}
