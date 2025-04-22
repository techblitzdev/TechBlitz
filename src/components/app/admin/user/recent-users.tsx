'use client';

import Link from 'next/link';
import UserRoleBadge from './user-role-badge';
import UserStatusBadge from './user-status-badge';

interface User {
  uid: string;
  email: string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  userLevel: string;
  createdAt: Date;
  subscription?: {
    active: boolean;
  } | null;
  Profile?: {
    jobTitle?: string | null;
    location?: string | null;
  } | null;
}

interface RecentUsersProps {
  users: User[];
}

export default function RecentUsers({ users }: RecentUsersProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDisplayName = (user: User) => {
    if (user.firstName || user.lastName) {
      return `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }
    if (user.username) {
      return user.username;
    }
    return user.email.split('@')[0];
  };

  return (
    <div className="bg-[#000000] border border-black-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Signups</h3>
        <Link href="/admin/users/list" className="text-sm text-primary hover:text-primary/80">
          View All
        </Link>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No recent users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black-75">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uid} className="border-t border-black-50 hover:bg-black-75">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link href={`/admin/users/${user.uid}`} className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-black-50 flex items-center justify-center">
                        <span className="text-sm text-gray-400">
                          {getDisplayName(user).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">{getDisplayName(user)}</div>
                        <div className="text-xs text-gray-400">{user.Profile?.jobTitle || ''}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <UserRoleBadge role={user.userLevel} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <UserStatusBadge isActive={!!user.subscription?.active} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
