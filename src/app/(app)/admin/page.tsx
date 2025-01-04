import { claudeTest } from '@/actions/ai/test';
import NewQuestionModal from '@/components/app/questions/new-question-modal';
import { Button } from '@/components/ui/button';

export default async function AdminPage() {
  return (
    <div className="px-6 h-screen flex gap-4 items-center justify-center">
      <NewQuestionModal className="w-fit" />
      <form action={claudeTest}>
        <Button type="submit" variant="secondary">
          Claude test
        </Button>
      </form>
    </div>
  );
}
