import AdminQuestionList from '@/components/questions/admin/question-list';
import NewQuestionModal from '@/components/questions/new-question-modal';
import { Separator } from '@/components/ui/separator';

export default function AdminQuestionsPage() {
  return (
    <div className="font-inter flex flex-col gap-y-4">
      <AdminQuestionList />
    </div>
  );
}
