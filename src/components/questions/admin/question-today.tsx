import { Button } from '@/components/ui/button';

export default function AdminQuestionToday() {
  return (
    <div className="flex flex-col gap-y-2 w-full items-center">
      <Button className="w-fit">Todays Question</Button>
      <p>Question: What is the capital of France?</p>
    </div>
  );
}
