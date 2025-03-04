'use client';
interface User {
  uid: string;
  email: string;
  Profile?: {
    location?: string | null;
  } | null;
}

interface ActiveUsersMapProps {
  users: User[];
}

export default function ActiveUsersMap({ users }: ActiveUsersMapProps) {
  // Count users with location data
  const usersWithLocation = users.filter((user) => user.Profile?.location).length;
  const totalUsers = users.length;
  const percentWithLocation =
    totalUsers > 0 ? Math.round((usersWithLocation / totalUsers) * 100) : 0;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Global User Distribution</h3>
        <div className="text-sm text-gray-400">
          {usersWithLocation} users with location data ({percentWithLocation}%)
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-black-75 rounded-lg">
        <div className="text-center p-6">
          <svg
            className="w-16 h-16 mx-auto text-gray-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-300 mb-2">World Map Visualization</p>
          <p className="text-gray-400 text-sm">
            This feature will display a global map showing user distribution.
          </p>
        </div>
      </div>
    </div>
  );
}
