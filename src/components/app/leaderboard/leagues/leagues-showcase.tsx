import { getLeagues } from '@/utils/data/leagues/get';
import { IndividualLeagueData } from '@prisma/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

function LeagueCard({ league }: { league: IndividualLeagueData }) {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
      <Card className="border border-gray-800 bg-gray-950/50 hover:bg-gray-900/50 transition-colors">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
          <h3 className="text-xl font-semibold text-white">{league.name}</h3>
          <p className="text-gray-400 text-sm mt-1">
            {league.description || 'Compete with others in this league'}
          </p>
        </CardContent>
      </Card>
    </CarouselItem>
  );
}

export default async function LeaguesShowcase() {
  const leagues = await getLeagues();

  return (
    <section className="p-12">
      <Carousel className="w-full">
        <CarouselContent>
          {leagues.map((league) => (
            <LeagueCard key={league.uid} league={league} />
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
