import { Metadata } from 'next';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'TechBlitz | Questions List',
  description: 'View and manage all coding questions',
};

export default async function QuestionsListPage() {
  // Fetch questions from the database
  const questions = await prisma.questions.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    select: {
      uid: true,
      title: true,
      slug: true,
      difficulty: true,
      updatedAt: true,
      isPremiumQuestion: true,
      questionType: true,
    },
  });

  return (
    <AdminContainer>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Questions List</h1>
          <div className="flex space-x-3">
            <Link
              href="/admin/questions"
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
            >
              Back to Questions
            </Link>
            <Link
              href="/admin/questions/new"
              className="text-sm px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
            >
              Create New Question
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-300">
            View and manage all coding questions. Click on a question to edit its content.
          </p>
        </div>

        <div className="bg-black-75 border border-black-50 rounded-lg overflow-hidden">
          {questions.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400 mb-4">No questions have been created yet.</p>
              <Link href="/admin/questions/new" className="text-primary hover:underline">
                Create your first question
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black-50">
                  {questions.map((question) => (
                    <tr key={question.uid}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{question.title}</div>
                        <div className="text-sm text-gray-400">{question.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {question.questionType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {question.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            question.isPremiumQuestion
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {question.isPremiumQuestion ? 'Premium' : 'Free'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(question.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/admin/questions/${question.uid}`}
                          className="text-primary hover:text-primary/90"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminContainer>
  );
}
