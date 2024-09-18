import AdminQuestionList from '@/components/questions/admin-question-list';
import NewQuestionModal from '@/components/questions/new-question-modal';
import { Separator } from '@/components/ui/separator';

export default function AdminQuestionsPage() {
  return (
    <div className="font-inter flex flex-col gap-y-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Admin Question's Page</h1>
        <NewQuestionModal className="w-fit" />
      </div>
      <Separator />
      <AdminQuestionList />
    </div>
  );
}
