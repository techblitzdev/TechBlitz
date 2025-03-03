import { Metadata } from 'next';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import UserChart from '@/components/app/admin/user-chart';
import UsersStatsCard from '@/components/app/admin/users-stats-card';
import RecentUsers from '@/components/app/admin/recent-users';
import ActiveUsersMap from '@/components/app/admin/active-users-map';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'TechBlitz | User Analytics',
  description: 'User statistics and analytics',
};

// Helper function to get past date
function getPastDate(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

// Helper function to format date as YYYY-MM-DD
function formatDateLabel(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

// Helper function to group users by signup date
function groupUsersBySignupDate(users: any[], days: number) {
  // Create an array of dates for the chart
  const dateLabels = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1) + i);
    return formatDateLabel(date);
  });

  // Initialize counts with zeros
  const userCounts = Array(days).fill(0);

  // Count users for each date
  users.forEach((user) => {
    const signupDate = new Date(user.createdAt);
    const dayDiff = Math.floor((new Date().getTime() - signupDate.getTime()) / (1000 * 3600 * 24));

    if (dayDiff < days) {
      userCounts[days - 1 - dayDiff]++;
    }
  });

  return { labels: dateLabels, counts: userCounts };
}

export default async function UserDashboardPage() {
  // Get all users
  const allUsers = await prisma.users.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      uid: true,
      email: true,
      firstName: true,
      lastName: true,
      username: true,
      userLevel: true,
      createdAt: true,
      subscription: {
        select: {
          active: true,
        },
      },
      Profile: {
        select: {
          jobTitle: true,
          location: true,
        },
      },
    },
  });

  // Calculate statistics
  const totalUsers = allUsers.length;
  const activeUsers = allUsers.filter((user) => user.subscription?.active).length;
  const adminUsers = allUsers.filter((user) => user.userLevel === 'ADMIN').length;
  const inactiveUsers = totalUsers - activeUsers;

  // Get last 7 days signups for percentage calculation
  const last7Days = getPastDate(7);
  const prev7Days = getPastDate(14);
  const last7DaysSignups = allUsers.filter((user) => new Date(user.createdAt) >= last7Days);
  const prev7DaysSignups = allUsers.filter(
    (user) => new Date(user.createdAt) >= prev7Days && new Date(user.createdAt) < last7Days
  );

  // Calculate growth percentage
  const growthPercentage =
    prev7DaysSignups.length > 0
      ? Math.round(
          ((last7DaysSignups.length - prev7DaysSignups.length) / prev7DaysSignups.length) * 100
        )
      : 100;

  // Prepare chart data for last 30 days
  const signupChartData = groupUsersBySignupDate(allUsers, 30);

  // Get most recent 10 users for the table
  const recentUsers = allUsers.slice(0, 10).map((user) => ({
    uid: user.uid,
    email: user.email,
    username: user.username || undefined,
    firstName: user.firstName || undefined,
    lastName: user.lastName || undefined,
    userLevel: user.userLevel,
    createdAt: user.createdAt,
    subscription: user.subscription || undefined,
    Profile: user.Profile || undefined,
  }));

  return (
    <AdminContainer>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">User Analytics</h1>
          <div className="flex space-x-3">
            <Link
              href="/admin/users/list"
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
            >
              View All Users
            </Link>
          </div>
        </div>

        {/* User Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <UsersStatsCard
            title="Total Users"
            value={totalUsers}
            icon={
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            }
            changePercentage={growthPercentage}
            trend={growthPercentage > 0 ? 'up' : growthPercentage < 0 ? 'down' : 'neutral'}
          />

          <UsersStatsCard
            title="Active Users"
            value={activeUsers}
            icon={
              <svg
                className="h-6 w-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
            changePercentage={Math.round((activeUsers / totalUsers) * 100)}
          />

          <UsersStatsCard
            title="Admin Users"
            value={adminUsers}
            icon={
              <svg
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
          />

          <UsersStatsCard
            title="Inactive Users"
            value={inactiveUsers}
            icon={
              <svg
                className="h-6 w-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            }
          />
        </div>

        {/* User Signups Chart and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <UserChart data={signupChartData} title="User Signups (Last 30 Days)" />
          </div>

          <div className="bg-[#000000] border border-black-50 rounded-lg p-6">
            <ActiveUsersMap users={allUsers} />
          </div>
        </div>

        {/* Recent Signups */}
        <div className="mb-6">
          <RecentUsers users={recentUsers} />
        </div>
      </div>
    </AdminContainer>
  );
}
