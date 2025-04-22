import { Metadata } from 'next';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import NewQuestionModal from '@/components/app/admin/questions/new-question-modal';
import NewCodingChallengeQuestionModal from '@/components/app/admin/questions/new-coding-challenge-modal';
import NewSimpleMultipleChoiceModal from '@/components/app/admin/questions/new-simple-multiple-choice-modal';

export const metadata: Metadata = {
  title: 'TechBlitz | Question Management',
  description: 'Manage coding questions and challenges',
};

export default function QuestionsAdminPage() {
  return (
    <AdminContainer>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Question Management</h1>
          <div className="flex space-x-3">
            <Link
              href="/admin"
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-300">
            Create and manage coding questions and challenges. Choose the type of question you want
            to create below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black-75 border border-black-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Create New Question</h2>
            <div className="flex flex-wrap gap-4">
              <NewQuestionModal />
              <NewCodingChallengeQuestionModal />
              <NewSimpleMultipleChoiceModal />
            </div>
          </div>

          <div className="bg-black-75 border border-black-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Question Management</h2>
            <div className="space-y-4">
              <Link
                href="/admin/questions/list"
                className="block w-full text-center px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
              >
                View All Questions
              </Link>
              <Link
                href="/admin/questions/categories"
                className="block w-full text-center px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
              >
                Manage Categories
              </Link>
              <Link
                href="/admin/questions/tags"
                className="block w-full text-center px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
              >
                Manage Tags
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminContainer>
  );
}
