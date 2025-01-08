import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from '@/components/ui/carousel';
import { QuestionWithTags } from '@/types/Questions';
import QuestionCard from './question-card';

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
  tag: 'javascript' | 'react' | 'web-dev' | 'async';
}) {
  const { heading, description, image, questions, tag } = opts;

  console.log(image);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <h6 className="text-xl lg:text-3xl text-wrap text-start text-gradient from-white to-white/55">
          {heading}
        </h6>
        <p className="text-sm text-wrap text-start">{description}</p>
      </div>
      <div className="relative w-full">
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#000] to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#000000] to-transparent z-10" />
        <Carousel
          opts={{
            loop: false,
            dragFree: true,
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {questions.map((q) => (
              <CarouselItem key={q.uid} className="pl-2 basis-1/3 h-full">
                <QuestionCard
                  questionData={q}
                  numberOfTags={1}
                  showcaseTag={tag}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
