import AdminQuestionList from '@/components/questions/admin/question-list';

export default function AdminQuestionsPage() {
  return (
    <div className="font-inter flex flex-col gap-y-4">
      <AdminQuestionList className="flex flex-col gap-y-4" />
    </div>
  );
}
