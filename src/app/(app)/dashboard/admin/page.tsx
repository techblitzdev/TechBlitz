'use client';
import {
  addSlugFlagToQuestion,
  addSlugToQuestion,
} from '@/scripts/add-slug-to-question';
import NewQuestionModal from '@/components/app/questions/new-question-modal';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  return (
    <div className="px-6 h-screen flex flex-col gap-5 items-center justify-center">
      <NewQuestionModal className="w-fit" />
      <form action={addSlugToQuestion}>
        <Button type="submit">Add URL to Question (test)</Button>
      </form>
      <form action={addSlugFlagToQuestion}>
        <Button type="submit">Add Slug Flag to Question</Button>
      </form>
    </div>
  );
}
