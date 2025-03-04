import { Metadata } from 'next';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import UserStatusBadge from '@/components/app/admin/user-status-badge';
import UserRoleBadge from '@/components/app/admin/user-role-badge';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'TechBlitz | User Management',
  description: 'Manage user accounts',
};

interface SearchParams {
  page?: string;
  query?: string;
  status?: string;
  role?: string;
}

export default async function UsersListPage({ searchParams }: { searchParams: SearchParams }) {
  // Extract search params with defaults
  const currentPage = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || '';
  const statusFilter = searchParams.status || 'all';
  const roleFilter = searchParams.role || 'all';
  const itemsPerPage = 10;

  // Build filters
  const filters: any = {};

  // Search by email, name, or username
  if (searchQuery) {
    filters.OR = [
      { email: { contains: searchQuery, mode: 'insensitive' } },
      { firstName: { contains: searchQuery, mode: 'insensitive' } },
      { lastName: { contains: searchQuery, mode: 'insensitive' } },
      { username: { contains: searchQuery, mode: 'insensitive' } },
    ];
  }

  // Filter by subscription status via the relation
  if (statusFilter !== 'all') {
    filters.subscription = {
      active: statusFilter === 'active',
    };
  }

  // Filter by user role
  if (roleFilter !== 'all') {
    filters.userLevel = roleFilter;
  }

  // Fetch users with pagination
  const users = await prisma.users.findMany({
    where: filters,
    select: {
      uid: true,
      createdAt: true,
      email: true,
      firstName: true,
      lastName: true,
      username: true,
      userLevel: true,
      subscription: {
        select: {
          active: true,
        },
      },
      Profile: {
        select: {
          location: true,
          jobTitle: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  // Count total users for pagination
  const totalUsers = await prisma.users.count({
    where: filters,
  });

  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get user display name
  const getDisplayName = (user: any) => {
    if (user.firstName || user.lastName) {
      return `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }
    if (user.username) {
      return user.username;
    }
    return user.email.split('@')[0];
  };

  return (
    <AdminContainer>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <div className="flex space-x-3">
            <Link
              href="/admin/users"
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Search and Filter Form */}
        <div className="bg-[#000000] border border-black-50 rounded-lg p-4 mb-6">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                id="search"
                name="query"
                defaultValue={searchQuery}
                placeholder="Search by email, name, or username..."
                className="w-full px-4 py-2 bg-black-100 border border-black-50 rounded-md text-white"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="sr-only">
                Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={statusFilter}
                className="w-full px-4 py-2 bg-black-100 border border-black-50 rounded-md text-white"
              >
                <option value="all">Any Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select
                id="role"
                name="role"
                defaultValue={roleFilter}
                className="w-full px-4 py-2 bg-black-100 border border-black-50 rounded-md text-white"
              >
                <option value="all">Any Role</option>
                <option value="ADMIN">Admin</option>
                <option value="STANDARD">Standard</option>
                <option value="PREMIUM">Premium</option>
                <option value="LIFETIME">Lifetime</option>
                <option value="TRIAL">Trial</option>
                <option value="FREE">Free</option>
              </select>
            </div>

            {/* Hidden Submit Button (for Enter key) */}
            <button type="submit" className="hidden">
              Search
            </button>
          </form>
        </div>

        {/* Users Table */}
        <div className="bg-[#000000] border border-black-50 rounded-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black-75">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Joined
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.uid} className="border-t border-black-50 hover:bg-black-75">
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black-50 flex items-center justify-center">
                          <span className="text-lg text-gray-400">
                            {getDisplayName(user).charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {getDisplayName(user)}
                          </div>
                          <div className="text-sm text-gray-400">
                            {user.Profile?.jobTitle || ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <UserRoleBadge role={user.userLevel} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <UserStatusBadge isActive={!!user.subscription?.active} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/users/${user.uid}`}
                          className="text-primary hover:text-primary/80"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/users/edit/${user.uid}`}
                          className="text-primary hover:text-primary/80 ml-3"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No users found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalUsers)} of {totalUsers} users
            </div>
            <div className="flex space-x-2">
              {currentPage > 1 && (
                <Link
                  href={`/admin/users/list?page=${currentPage - 1}&query=${searchQuery}&status=${statusFilter}&role=${roleFilter}`}
                  className="px-3 py-1 bg-black-75 hover:bg-black-50 text-white rounded-md text-sm"
                >
                  Previous
                </Link>
              )}

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show current page and 2 pages before and after when possible
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Link
                    key={pageNum}
                    href={`/admin/users/list?page=${pageNum}&query=${searchQuery}&status=${statusFilter}&role=${roleFilter}`}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === pageNum
                        ? 'bg-primary text-white'
                        : 'bg-black-75 hover:bg-black-50 text-white'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}

              {currentPage < totalPages && (
                <Link
                  href={`/admin/users/list?page=${currentPage + 1}&query=${searchQuery}&status=${statusFilter}&role=${roleFilter}`}
                  className="px-3 py-1 bg-black-75 hover:bg-black-50 text-white rounded-md text-sm"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminContainer>
  );
}
