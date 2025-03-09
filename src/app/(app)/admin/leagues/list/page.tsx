import { Metadata } from 'next';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import { ArrowLeft, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { getLeagues } from '@/utils/data/leagues/get';

export const metadata: Metadata = {
  title: 'TechBlitz | League List',
  description: 'View and manage all leagues',
};

export default async function LeagueListPage() {
  const leagues = await getLeagues();
  return (
    <AdminContainer>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">League List</h1>
          <div className="flex space-x-3">
            <Link href="/admin/leagues/create">
              <Button className="bg-accent hover:bg-accent/80 text-white">
                <Plus className="h-4 w-4 mr-2" /> Create League
              </Button>
            </Link>
            <Link
              href="/admin/leagues"
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {leagues.length === 0 && <div className="text-white">No leagues found</div>}
          {leagues.map((league) => (
            <Card key={league.uid} className="bg-black-75 border-black-50 p-6">
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
                        <p className="text-sm text-gray-400">Power-ups/Week</p>
                        <p className="text-white">{league.maxPowerUpsPerWeek}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Link
                  href={`/admin/leagues/${league.uid}`}
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
