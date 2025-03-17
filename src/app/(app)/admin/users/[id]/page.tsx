import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'TechBlitz | User Details',
  description: 'View user details',
};

export default async function UserDetailPage({ params }: { params: { id: string } }) {
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

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get user display name
  const displayName =
    user.username || user.firstName
      ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
      : user.email.split('@')[0];

  return (
    <AdminContainer>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">User Details</h1>
          <div className="flex space-x-3">
            <Link
              href="/admin/users/list"
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
            >
              Back to Users
            </Link>
            <Link
              href={`/admin/users/edit/${user.uid}`}
              className="text-sm px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
            >
              Edit User
            </Link>
          </div>
        </div>

        {/* User Overview */}
        <div className="bg-[#000000] border border-black-50 rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="h-24 w-24 rounded-full bg-black-50 flex items-center justify-center overflow-hidden">
                {user.userProfilePicture ? (
                  <img
                    src={user.userProfilePicture}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl text-gray-400">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{displayName}</h2>
                <p className="text-lg text-gray-300">{user.email}</p>
                <p className="text-sm text-gray-400">{user.Profile?.jobTitle || 'No title'}</p>

                <div className="mt-2 flex items-center space-x-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.subscription?.active
                        ? 'bg-green-900 text-green-300'
                        : 'bg-red-900 text-red-300'
                    }`}
                  >
                    {user.subscription?.active ? 'Active' : 'Inactive'}
                  </span>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.userLevel === 'ADMIN'
                        ? 'bg-blue-900 text-blue-300'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {user.userLevel}
                  </span>
                </div>
              </div>

              <div className="flex flex-col text-right">
                <span className="text-sm text-gray-400">Member Since</span>
                <span className="text-white">{formatDate(user.createdAt)}</span>
                <span className="text-sm text-gray-400 mt-2">Last Login</span>
                <span className="text-white">{formatDate(user.lastLogin)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Personal Information */}
          <div className="bg-[#000000] border border-black-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Personal Information</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-400">Username</dt>
                <dd className="mt-1 text-white">{user.username || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Full Name</dt>
                <dd className="mt-1 text-white">
                  {user.firstName || user.lastName
                    ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                    : 'Not provided'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Email Address</dt>
                <dd className="mt-1 text-white">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Role</dt>
                <dd className="mt-1 text-white">{user.userLevel}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Experience Level</dt>
                <dd className="mt-1 text-white">{user.experienceLevel}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Location</dt>
                <dd className="mt-1 text-white">{user.Profile?.location || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Daily Time Commitment</dt>
                <dd className="mt-1 text-white">
                  {user.timeSpendingPerDay?.replace(/_/g, ' ').toLowerCase() || 'Not specified'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Profile Information */}
          <div className="bg-[#000000] border border-black-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Profile Information</h2>
            {user.Profile ? (
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-400">Job Title</dt>
                  <dd className="mt-1 text-white">{user.Profile.jobTitle || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Company</dt>
                  <dd className="mt-1 text-white">{user.Profile.company || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Bio</dt>
                  <dd className="mt-1 text-white">{user.Profile.bio || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Experience</dt>
                  <dd className="mt-1 text-white">
                    {user.Profile.yearsOfExperience
                      ? `${user.Profile.yearsOfExperience} years`
                      : 'Not provided'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Website</dt>
                  <dd className="mt-1 text-white">
                    {user.Profile.website ? (
                      <a
                        href={user.Profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {user.Profile.website}
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Social Links</dt>
                  <dd className="mt-1 flex flex-wrap gap-2">
                    {user.Profile.github && (
                      <a
                        href={user.Profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {user.Profile.twitter && (
                      <a
                        href={user.Profile.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Twitter
                      </a>
                    )}
                    {user.Profile.linkedin && (
                      <a
                        href={user.Profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {!user.Profile.github && !user.Profile.twitter && !user.Profile.linkedin && (
                      <span className="text-gray-400">No social links provided</span>
                    )}
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="text-gray-400">No profile information available</p>
            )}
          </div>
        </div>

        {/* Activity & Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subscription Information */}
          <div className="bg-[#000000] border border-black-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Subscription</h2>
            {user.subscription ? (
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-400">Status</dt>
                  <dd className="mt-1 text-white">
                    {user.subscription.active ? 'Active' : 'Inactive'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Plan ID</dt>
                  <dd className="mt-1 text-white">{user.subscription.planId}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Start Date</dt>
                  <dd className="mt-1 text-white">{formatDate(user.subscription.startDate)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">End Date</dt>
                  <dd className="mt-1 text-white">{formatDate(user.subscription.endDate)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Product ID</dt>
                  <dd className="mt-1 text-white">{user.subscription.productId}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Stripe Customer ID</dt>
                  <dd className="mt-1 text-white">{user.subscription.stripeCustomerId || 'N/A'}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-gray-400">No subscription information available</p>
            )}
          </div>

          {/* Admin Actions */}
          <div className="bg-[#000000] border border-black-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Admin Actions</h2>
            <div className="space-y-4">
              <button
                type="button"
                className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
              >
                Reset Password
              </button>
              <button
                type="button"
                className={`w-full px-4 py-2 ${
                  user.subscription?.active
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white rounded-md transition-colors`}
              >
                {user.subscription?.active ? 'Deactivate Subscription' : 'Activate Subscription'}
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
              >
                {user.userLevel === 'ADMIN' ? 'Remove Admin Rights' : 'Grant Admin Rights'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminContainer>
  );
}
