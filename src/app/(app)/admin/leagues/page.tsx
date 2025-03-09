import { Metadata } from 'next';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import { Trophy, Users, Award, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'TechBlitz | League Management',
  description: 'Manage leagues, achievements, and user rankings',
};

export default async function LeaguesAdminPage() {
  return (
    <AdminContainer>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">League Management</h1>
          <div className="flex space-x-3">
            <Link
              href="/admin"
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black-75 border-black-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Leagues</p>
                <h3 className="text-2xl font-bold text-white mt-1">5</h3>
              </div>
              <Trophy className="h-8 w-8 text-accent" />
            </div>
          </Card>

          <Card className="bg-black-75 border-black-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Users</p>
                <h3 className="text-2xl font-bold text-white mt-1">150</h3>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="bg-black-75 border-black-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Achievements Earned</p>
                <h3 className="text-2xl font-bold text-white mt-1">324</h3>
              </div>
              <Award className="h-8 w-8 text-green-400" />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-black-75 border-black-50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                href="/admin/leagues/list"
                className="flex items-center justify-between p-3 bg-black-50 rounded-md hover:bg-black-25 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-accent" />
                  <div>
                    <h3 className="text-white font-medium">Manage Leagues</h3>
                    <p className="text-sm text-gray-400">View and edit league settings</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-400" />
              </Link>

              <Link
                href="/admin/leagues/achievements"
                className="flex items-center justify-between p-3 bg-black-50 rounded-md hover:bg-black-25 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-green-400" />
                  <div>
                    <h3 className="text-white font-medium">Achievement Settings</h3>
                    <p className="text-sm text-gray-400">Configure league achievements</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </Card>

          <Card className="bg-black-75 border-black-50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-black-50">
                <div className="flex items-center gap-3">
                  <Trophy className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-white">New user promoted to Gold League</p>
                    <p className="text-sm text-gray-400">2 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black-50">
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-green-400" />
                  <div>
                    <p className="text-white">Achievement unlocked: Perfect Week</p>
                    <p className="text-sm text-gray-400">15 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-white">5 users joined Silver League</p>
                    <p className="text-sm text-gray-400">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminContainer>
  );
}
