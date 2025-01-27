'use client';

import { ReactNode } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { QuestionDifficulty } from '@/types/Questions';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface QuestionCarouselProps {
  heading: string | React.ReactNode;
  description: string | React.ReactNode;
  image: string;
  tag: string | string[];
  difficulty?: QuestionDifficulty;
  children: ReactNode;
  studyPath?: string;
}

export default function QuestionCarousel({
  heading,
  description,
  image,
  children,
  studyPath,
}: QuestionCarouselProps) {
  console.log(image);

  return (
    <Carousel
      opts={{
        loop: false,
        dragFree: true,
        align: 'start',
      }}
      className="w-full"
    >
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col md:flex-row gap-4 w-full md:justify-between md:items-end">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl lg:text-3xl text-wrap text-start text-gradient from-white to-white/55">
              {heading}
            </h2>
            <p className="text-sm text-wrap text-start">{description}</p>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <Button href={`/study-paths/${studyPath}`} variant="default">
              View study path
              <ChevronRight className="size-4 ml-2" />
            </Button>
            <div className="flex items-center gap-2 md:hidden">
              <CarouselPrevious
                className="border-none text-white top-0 left-0 right-0 relative translate-y-0"
                variant="default"
              />
              <CarouselNext
                className="border-none text-white top-0 left-0 right-0 relative translate-y-0"
                variant="default"
              />
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <div className="hidden md:block absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#000000] to-transparent z-10" />
          <CarouselContent className="grid grid-flow-col auto-cols-[calc(100%-8px)] md:auto-cols-[calc(50%-8px)] lg:auto-cols-[calc(33.33%-8px)] gap-4">
            {children}
          </CarouselContent>
          <CarouselPrevious
            className="hidden md:block border-none text-white -top-20 -left-6 z-10"
            variant="ghost"
          />
          <CarouselNext
            className="hidden md:block border-none text-white -top-20"
            variant="ghost"
          />
        </div>
      </div>
    </Carousel>
  );
}
