import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AdminContainer from '@/components/app/admin/admin-container';
import { prisma } from '@/lib/prisma';
import EditLeagueForm from '@/components/app/admin/leagues/edit-league-form';

export const metadata: Metadata = {
  title: 'TechBlitz | Edit League',
  description: 'View and modify league settings',
};

async function getLeague(uid: string) {
  const league = await prisma.individualLeagueData.findUnique({
    where: { uid },
  });

  return league;
}

export default async function LeaguePage({ params }: { params: { uid: string } }) {
  const league = await getLeague(params.uid);

  console.log({
    league,
  });

  return (
    <AdminContainer>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex flex-col items-start space-y-4">
          <Link
            href="/admin/leagues/list"
            className="flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to League List
          </Link>
          <h1 className="text-2xl font-bold text-white">Edit League: {league?.name}</h1>
        </div>
      </div>

      <div className="grid gap-8">
        <EditLeagueForm league={league} />
      </div>
    </AdminContainer>
  );
}
