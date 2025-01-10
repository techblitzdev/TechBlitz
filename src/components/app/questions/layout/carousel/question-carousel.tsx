import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { QuestionWithTags } from '@/types/Questions';

import QuestionCarouselCard from './question-carousel-card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

/**
 * A carousel that will showcase a set of questions.
 *
 * opts: - the questions to display
 *       - the question tag
 */
export default function QuestionCarousel(opts: {
  heading: string | React.ReactNode;
  description: string | React.ReactNode;
  image: string;
  questions: QuestionWithTags[];
  tag: string | string[];
}) {
  const { heading, description, image, questions, tag } = opts;

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
            <h6 className="text-xl lg:text-3xl text-wrap text-start text-gradient from-white to-white/55">
              {heading}
            </h6>
            <p className="text-sm text-wrap text-start">{description}</p>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <Button
              href={`/questions?tag=${Array.isArray(tag) ? tag[0] : tag}`}
              variant="default"
            >
              View more
              <ChevronRight className="size-4 ml-2" />
            </Button>
            <div className="flex items-center gap-2">
              <CarouselPrevious
                className="md:hidden border-none text-white top-0 left-0 right-0 relative translate-y-0"
                variant="default"
              />
              <CarouselNext
                className="md:hidden border-none text-white top-0 left-0 right-0 relative translate-y-0"
                variant="default"
              />
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <div className="hidden md:block absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#000] to-transparent z-10" />
          <div className="hidden md:block absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#000000] to-transparent z-10" />
          <CarouselContent className="grid grid-flow-col auto-cols-[calc(100%-8px)] md:auto-cols-[calc(50%-8px)] lg:auto-cols-[calc(33.33%-8px)] gap-4">
            {questions.map((q) => (
              <CarouselItem key={q.uid} className="flex">
                <QuestionCarouselCard key={q.uid} questionData={q} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="hidden md:block border-none text-white -top-12 left-0 z-10"
            variant="ghost"
          />
          <CarouselNext
            className="hidden md:block border-none text-white -top-12"
            variant="ghost"
          />
        </div>
      </div>
    </Carousel>
  );
}
