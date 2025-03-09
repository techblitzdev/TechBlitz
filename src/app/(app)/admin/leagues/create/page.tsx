import { Metadata } from 'next';
import Link from 'next/link';
import AdminContainer from '@/components/app/admin/admin-container';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import CreateLeagueForm from '@/components/app/admin/leagues/create-league-form';

export const metadata: Metadata = {
  title: 'TechBlitz | Create League',
  description: 'Create a new league and configure its settings',
};

export default async function CreateLeaguePage() {
  return (
    <AdminContainer>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Create New League</h1>
          <div className="flex space-x-3">
            <Link
              href="/admin/leagues/list"
              className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Leagues
            </Link>
          </div>
        </div>

        <Card className="bg-black-75 border-black-50 p-6">
          <CreateLeagueForm />
        </Card>
      </div>
    </AdminContainer>
  );
}
