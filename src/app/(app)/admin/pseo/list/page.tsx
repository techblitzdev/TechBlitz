import { Metadata } from 'next';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import { prisma } from '@/lib/prisma';
import { getBaseUrl } from '@/utils';
import PseoPublishToggle from '@/components/app/admin/pseo-publish-toggle';

export const metadata: Metadata = {
  title: 'TechBlitz | PSEO Pages List',
  description: 'Manage existing PSEO pages',
};

interface PseoPageListItem {
  uid: string;
  slug: string;
  title: string;
  metaTitle: string;
  updatedAt: Date;
  isPublished: boolean;
}

export default async function PseoListPage() {
  // Fetch PSEO pages from the database
  const pseoPages = await prisma.pseoPages.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    select: {
      uid: true,
      slug: true,
      title: true,
      metaTitle: true,
      updatedAt: true,
      isPublished: true,
    },
  });

  return (
    <AdminContainer>
      <div className="max-w-7xl mx-auto bg-[#000000]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">PSEO Pages</h1>
          <div className="flex space-x-3">
            <Link
              href="/admin"
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/admin/pseo"
              className="text-sm px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
            >
              Create New Page
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-300">
            Manage your existing PSEO pages. Click on a page to edit its content.
          </p>
        </div>

        <div className="bg-black-75 border border-black-50 rounded-lg overflow-hidden">
          {pseoPages.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400 mb-4">No PSEO pages have been created yet.</p>
              <Link href="/admin/pseo" className="text-primary hover:underline">
                Create your first PSEO page
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
                      Slug
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
                  {pseoPages.map((page: PseoPageListItem) => (
                    <tr key={page.uid} className="hover:bg-black-50/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {page.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {page.slug}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              page.isPublished
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {page.isPublished ? 'Published' : 'Draft'}
                          </span>
                          <PseoPublishToggle uid={page.uid} isPublished={page.isPublished} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(page.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <Link
                          href={`/admin/pseo/edit/${page.uid}`}
                          className="text-secondary hover:underline"
                        >
                          Edit
                        </Link>
                        {page.isPublished && (
                          <>
                            <span className="text-gray-500">|</span>
                            <Link
                              href={`${getBaseUrl()}${page.slug}`}
                              target="_blank"
                              className="text-accent hover:underline"
                            >
                              View
                            </Link>
                          </>
                        )}
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
