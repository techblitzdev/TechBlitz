import { Metadata } from 'next';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import { ArrowLeft, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'TechBlitz | League List',
  description: 'View and manage all leagues',
};

const MOCK_LEAGUES = [
  {
    id: 'bronze',
    name: 'Bronze League',
    color: 'CD7F32',
    description: 'Entry level league for new users',
    xpRequirement: 0,
    xpMultiplier: 1.0,
    currentUsers: 50,
    maxUsers: 100,
    powerUpsPerWeek: 1,
    weeklyChallenge: 'Complete 5 challenges',
    weeklyChallengeXP: 100,
  },
  {
    id: 'silver',
    name: 'Silver League',
    color: 'C0C0C0',
    description: 'Intermediate league for consistent users',
    xpRequirement: 1000,
    xpMultiplier: 1.2,
    currentUsers: 40,
    maxUsers: 75,
    powerUpsPerWeek: 2,
    weeklyChallenge: 'Maintain a 3-day streak',
    weeklyChallengeXP: 200,
  },
  {
    id: 'gold',
    name: 'Gold League',
    color: 'FFD700',
    description: 'Advanced league for dedicated users',
    xpRequirement: 5000,
    xpMultiplier: 1.5,
    currentUsers: 30,
    maxUsers: 50,
    powerUpsPerWeek: 3,
    weeklyChallenge: 'Complete 10 hard challenges',
    weeklyChallengeXP: 500,
  },
  {
    id: 'platinum',
    name: 'Platinum League',
    color: 'E5E4E2',
    description: 'Elite league for top performers',
    xpRequirement: 10000,
    xpMultiplier: 2.0,
    currentUsers: 20,
    maxUsers: 30,
    powerUpsPerWeek: 4,
    weeklyChallenge: 'Maintain a 7-day streak',
    weeklyChallengeXP: 1000,
  },
  {
    id: 'diamond',
    name: 'Diamond League',
    color: 'b9f2ff',
    description: 'Legendary league for the best of the best',
    xpRequirement: 25000,
    xpMultiplier: 3.0,
    currentUsers: 10,
    maxUsers: 15,
    powerUpsPerWeek: 5,
    weeklyChallenge: 'Complete all daily challenges',
    weeklyChallengeXP: 2000,
  },
];

export default async function LeagueListPage() {
  return (
    <AdminContainer>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">League List</h1>
          <div className="flex space-x-3">
            <Link
              href="/admin/leagues"
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {MOCK_LEAGUES.map((league) => (
            <Card key={league.id} className="bg-black-75 border-black-50 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className="w-3 h-3 rounded-full mt-2"
                    style={{ backgroundColor: `#${league.color}` }}
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{league.name}</h3>
                    <p className="text-gray-400 mt-1">{league.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-400">XP Requirement</p>
                        <p className="text-white">{league.xpRequirement.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">XP Multiplier</p>
                        <p className="text-white">{league.xpMultiplier}x</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Users</p>
                        <p className="text-white">
                          {league.currentUsers} / {league.maxUsers}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Power-ups/Week</p>
                        <p className="text-white">{league.powerUpsPerWeek}</p>
                      </div>
                    </div>
                    {league.weeklyChallenge && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-400">Weekly Challenge</p>
                        <p className="text-white flex items-center gap-2">
                          {league.weeklyChallenge}
                          {league.weeklyChallengeXP && (
                            <span className="text-accent">(+{league.weeklyChallengeXP} XP)</span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">{league.currentUsers}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Link
                  href={`/admin/leagues/${league.id}`}
                  className="text-sm text-accent hover:text-accent/80"
                >
                  View Details
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminContainer>
  );
}
