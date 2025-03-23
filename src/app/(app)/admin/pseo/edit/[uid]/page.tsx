import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import PseoForm from '@/components/app/admin/pseo-form';
import { prisma } from '@/lib/prisma';
import { getBaseUrl } from '@/utils';

export const metadata: Metadata = {
  title: 'TechBlitz | Edit PSEO Page',
  description: 'Edit an existing PSEO page',
};

export default async function EditPseoPage({ params }: { params: { uid: string } }) {
  // Fetch the PSEO page data
  const pseoPage = await prisma.pseoPages.findUnique({
    where: {
      uid: params.uid,
    },
  });

  // If page doesn't exist, show 404
  if (!pseoPage) {
    notFound();
  }

  return (
    <AdminContainer>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Edit PSEO Page</h1>
          <div className="flex space-x-3">
            <Link
              href="/admin/pseo/list"
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
            >
              Back to List
            </Link>
            <Link
              href={`${getBaseUrl()}/${pseoPage.slug}`}
              target="_blank"
              className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              View Page
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-300">
            Edit your PSEO page details below. All fields marked with * are required.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Last updated: {new Date(pseoPage.updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="bg-black-75 border border-black-50 rounded-lg p-6">
          <PseoForm initialData={pseoPage} isEditing />
        </div>
      </div>
    </AdminContainer>
  );
}
