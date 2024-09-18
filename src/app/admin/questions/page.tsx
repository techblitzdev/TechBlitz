import NewQuestionModal from '@/components/modals/new-question-modal';

export default function AdminQuestionsPage() {
  return (
    <div className="font-inter">
      <h1 className="font-bold text-3xl">Admin Question's Page</h1>
      <div className="mt-2">
        <p className="text-xs">
          Here you can add new questions, review previous questions and delete
          questions.
        </p>
      </div>

      <NewQuestionModal className="mt-4" />
    </div>
  );
}
