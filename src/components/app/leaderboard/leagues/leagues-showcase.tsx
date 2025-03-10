'use client';

import { IndividualLeagueData } from '@prisma/client';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { capitalise } from '@/utils';

function LeagueIcon({ league, isActive }: { league: IndividualLeagueData; isActive: boolean }) {
  return (
    <CarouselItem className="basis-[20%] pl-0 overflow-visible">
      <Card
        className={`border-none p-3 transition-all duration-300 ${
          isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-50'
        }`}
      >
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
      {/* Carousel section */}
      <Carousel
        opts={{
          loop: true,
          align: 'center',
          containScroll: false,
          dragFree: true,
        }}
        className="w-full px-4 md:px-12"
        setApi={(api) => {
          api?.on('select', () => {
            setCurrentLeagueIndex(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent className="cursor-pointer">
          {leagues.map((league, index) => (
            <LeagueIcon key={league.uid} league={league} isActive={index === currentLeagueIndex} />
          ))}
        </CarouselContent>
      </Carousel>
      {/* Detached text section */}
      <div className="text-center mb-8 min-h-[50px] flex flex-col items-center justify-center">
        <h3 className="text-3xl font-semibold text-gradient from-white/55 to-white transition-all duration-300">
          {leagues[currentLeagueIndex]?.name
            ? `${capitalise(leagues[currentLeagueIndex].name)} League`
            : 'League'}
        </h3>
      </div>
    </section>
  );
}
