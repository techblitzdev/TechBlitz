import { Button } from '@/components/ui/button';
import { Question } from '@/types/Questions';
import AdminQuestionCard from './question-card';

export default function AdminQuestionToday({
  question,
}: {
  question: Question;
}) {
  return (
    <div className="flex flex-col gap-y-2 w-full items-center">
      <Button className="w-fit">Todays Question</Button>
      <AdminQuestionCard question={question} />
    </div>
  );
}
