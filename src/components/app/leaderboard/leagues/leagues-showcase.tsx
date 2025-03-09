import { getLeagues } from '@/utils/data/leagues/get';
import { IndividualLeagueData } from '@prisma/client';

function LeagueCard({ league }: { league: IndividualLeagueData }) {
  return (
    <div>
      <h1>{league.name}</h1>
    </div>
  );
}

export default async function LeaguesShowcase() {
  const leagues = await getLeagues();

  return <section></section>;
}
