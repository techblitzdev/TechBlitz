'use client';
import { addUrlToQuestion } from '@/actions/questions/scripts/add-slug';
import NewQuestionModal from '@/components/app/questions/new-question-modal';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  return (
    <div className="px-6 h-screen flex items-center justify-center">
      <NewQuestionModal className="w-fit" />
      <form action={addUrlToQuestion}>
        <Button type="submit">Add URL to Question (test)</Button>
      </form>
    </div>
  );
}
