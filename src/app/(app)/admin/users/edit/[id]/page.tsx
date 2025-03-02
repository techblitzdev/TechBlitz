import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import { prisma } from '@/lib/prisma';
import UserEditForm from '@/components/app/admin/user-edit-form';

export const metadata: Metadata = {
  title: 'TechBlitz | Edit User',
  description: 'Update user information',
};

export default async function UserEditPage({ params }: { params: { id: string } }) {
  // Fetch user data
  const user = await prisma.users.findUnique({
    where: {
      uid: params.id,
    },
    include: {
      Profile: true,
      subscription: true,
    },
  });

  // If user doesn't exist, show 404
  if (!user) {
    notFound();
  }

  return (
    <AdminContainer>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Edit User</h1>
          <div className="flex space-x-3">
            <Link
              href={`/admin/users/${user.uid}`}
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* User Edit Form */}
        <div className="bg-[#000000] border border-black-50 rounded-lg overflow-hidden">
          <div className="p-6">
            <UserEditForm user={user} />
          </div>
        </div>
      </div>
    </AdminContainer>
  );
}
