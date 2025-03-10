'use client';

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
import { useEffect, useState } from 'react';

function LeagueIcon({ league }: { league: IndividualLeagueData }) {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
      <Card className="border-none p-3">
        <CardContent className="flex items-center justify-center p-6">
          {/** DUMMY ICON / SHIELD UNTIL I DESIGN ONE */}
          <div style={{ backgroundColor: `#${league.color}` }} className="size-20 rounded-lg"></div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
}

export default function LeaguesShowcase({ leagues }: { leagues: IndividualLeagueData[] }) {
  const [currentLeagueIndex, setCurrentLeagueIndex] = useState(0);

  return (
    <section className="space-y-6">
      {/* Detached text section */}
      <div className="text-center mb-8 min-h-[80px] flex flex-col items-center justify-center">
        <h3 className="text-2xl font-semibold text-gradient from-white/55 to-white uppercase transition-all duration-300">
          {leagues[currentLeagueIndex]?.name
            ? `${leagues[currentLeagueIndex].name} League`
            : 'League'}
        </h3>
        <p className="text-gray-400 mt-2 transition-all duration-300">
          {leagues[currentLeagueIndex]?.description || 'Compete with others in your league'}
        </p>
      </div>

      {/* Carousel section */}
      <Carousel
        opts={{ loop: true }}
        className="w-full"
        setApi={(api) => {
          api?.on('select', () => {
            setCurrentLeagueIndex(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent className="cursor-pointer">
          {leagues.map((league) => (
            <LeagueIcon key={league.uid} league={league} />
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </section>
  );
}
