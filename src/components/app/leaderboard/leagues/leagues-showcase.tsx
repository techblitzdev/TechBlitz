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

function LeagueCard({ league }: { league: IndividualLeagueData }) {
  return (
    <CarouselItem className="md:basis-1/3 lg:basis-1/5">
      <Card className="border-none">
        <CardContent className="flex flex-col gap-4 items-center justify-center p-6">
          {/** DUMMY ICON / SHIELD UNTIL I DESIGN ONE */}
          <div style={{ backgroundColor: `#${league.color}` }} className="size-20 rounded-lg"></div>
          <h3 className="text-xl font-semibold text-white">{league.name}</h3>
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
