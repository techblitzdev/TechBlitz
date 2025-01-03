import NewQuestionModal from '@/components/app/questions/new-question-modal';

export default async function AdminPage() {
  return (
    <div className="px-6 h-screen flex items-center justify-center">
      <NewQuestionModal className="w-fit" />
    </div>
  );
}
