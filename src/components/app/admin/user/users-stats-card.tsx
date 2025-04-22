'use client';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  changePercentage?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export default function UsersStatsCard({
  title,
  value,
  icon,
  changePercentage,
  trend = 'neutral',
}: StatsCardProps) {
  return (
    <div className="bg-[#000000] border border-black-50 rounded-lg p-6">
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-lg bg-black-75 flex items-center justify-center">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <div className="flex items-center mt-1">
            <p className="text-2xl font-bold text-white">{value}</p>

            {changePercentage !== undefined && (
              <div className="flex items-center ml-2">
                <span
                  className={`text-sm font-medium ${
                    trend === 'up'
                      ? 'text-green-400'
                      : trend === 'down'
                        ? 'text-red-400'
                        : 'text-gray-400'
                  }`}
                >
                  {trend === 'up' && '+'}
                  {changePercentage}%
                  {trend === 'up' && (
                    <svg
                      className="w-3 h-3 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                  {trend === 'down' && (
                    <svg
                      className="w-3 h-3 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
