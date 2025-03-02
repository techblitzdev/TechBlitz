import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'TechBlitz | Admin Dashboard',
  description: 'TechBlitz Administration Dashboard',
};

export default function AdminDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Admin Dashboard</h1>
      <p className="text-gray-300 mb-8">
        Welcome to the TechBlitz administration area. Use the cards below to navigate to different
        sections.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#000000] rounded-lg shadow-sm border border-black-50 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">PSEO Pages</h2>
            <p className="text-gray-400 mb-4">Create and manage PSEO pages for SEO optimization.</p>
          </div>
          <div className="bg-black-50 px-6 py-3 flex justify-between">
            <Link
              href="/admin/pseo"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              Create New
            </Link>
            <Link
              href="/admin/pseo/list"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="bg-[#000000] rounded-lg shadow-sm border border-black-50 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Users</h2>
            <p className="text-gray-400 mb-4">Manage user accounts and view analytics.</p>
          </div>
          <div className="bg-black-50 px-6 py-3 flex justify-between">
            <Link
              href="/admin/users"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/users/list"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="bg-[#000000] rounded-lg shadow-sm p-6 border border-black-50 opacity-50">
          <h2 className="text-xl font-semibold mb-2 text-white">Content</h2>
          <p className="text-gray-400 mb-4">Manage site content and resources (coming soon).</p>
          <div className="flex justify-end">
            <span className="text-gray-400">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
