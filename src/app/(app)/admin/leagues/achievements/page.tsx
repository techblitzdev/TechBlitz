import { Metadata } from 'next';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import { ArrowLeft, Award, Trophy, Users, Clock, Star, Shield, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'TechBlitz | League Achievements',
  description: 'Manage league achievements and rewards',
};

const MOCK_ACHIEVEMENTS = [
  {
    id: 'league-winner',
    name: 'League Winner',
    description: 'Finish first in your league',
    icon: Trophy,
    xpBonus: 1000,
    type: 'LEAGUE_WINNER',
    timesAwarded: 25,
  },
  {
    id: 'top-three',
    name: 'Top Three',
    description: 'Finish in the top 3 of your league',
    icon: Star,
    xpBonus: 500,
    type: 'TOP_THREE',
    timesAwarded: 75,
  },
  {
    id: 'promotion',
    name: 'Promotion',
    description: 'Get promoted to a higher league',
    icon: Award,
    xpBonus: 750,
    type: 'PROMOTION',
    timesAwarded: 100,
  },
  {
    id: 'perfect-week',
    name: 'Perfect Week',
    description: 'Complete all daily challenges for a week',
    icon: Star,
    xpBonus: 1500,
    type: 'PERFECT_WEEK',
    timesAwarded: 50,
  },
  {
    id: 'survival',
    name: 'Survival',
    description: 'Avoid relegation when in bottom 5',
    icon: Shield,
    xpBonus: 300,
    type: 'SURVIVAL',
    timesAwarded: 150,
  },
  {
    id: 'comeback-king',
    name: 'Comeback King',
    description: 'Rise from bottom 3 to top 3',
    icon: Zap,
    xpBonus: 1000,
    type: 'COMEBACK_KING',
    timesAwarded: 15,
  },
  {
    id: 'consistency',
    name: 'Consistency',
    description: 'Stay in top 3 for three weeks',
    icon: Clock,
    xpBonus: 2000,
    type: 'CONSISTENCY',
    timesAwarded: 10,
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Reach top position in record time',
    icon: Zap,
    xpBonus: 1500,
    type: 'SPEED_DEMON',
    timesAwarded: 5,
  },
];

export default async function LeagueAchievementsPage() {
  return (
    <AdminContainer>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">League Achievements</h1>
          <div className="flex space-x-3">
            <Link
              href="/admin/leagues"
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_ACHIEVEMENTS.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <Card key={achievement.id} className="bg-black-75 border-black-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black-50 rounded-lg">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">{achievement.name}</h3>
                      <span className="text-accent">+{achievement.xpBonus} XP</span>
                    </div>
                    <p className="text-gray-400 mt-1">{achievement.description}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-400">Times Awarded</p>
                        <p className="text-white">{achievement.timesAwarded}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Type</p>
                        <p className="text-white">{achievement.type}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-black-50 flex justify-end">
                  <Link
                    href={`/admin/leagues/achievements/${achievement.id}`}
                    className="text-sm text-accent hover:text-accent/80"
                  >
                    View Details
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminContainer>
  );
}
