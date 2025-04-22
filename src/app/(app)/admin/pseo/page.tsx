import { Metadata } from 'next';
import PseoForm from '@/components/app/admin/pseo/pseo-form';
import AdminContainer from '@/components/app/admin/admin-container';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'TechBlitz | PSEO Page Management',
  description: 'Create and manage PSEO pages for SEO optimization',
};

export default function PseoAdminPage() {
  return (
    <AdminContainer>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">PSEO Page Management</h1>
          <Link
            href="/admin"
            className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <p className="text-gray-300">
            Create search engine optimized pages by filling out the form below. All fields marked
            with * are required.
          </p>
        </div>

        <div className="bg-black-75 border border-black-50 rounded-lg p-6">
          <PseoForm />
        </div>
      </div>
    </AdminContainer>
  );
}
