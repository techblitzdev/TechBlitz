'use client';

import Image from 'next/image';
import JakeMackieTestimonial from '@/public/images/testimonials/jake-mackie-techblitz-testimonial.jpeg';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const testimonials = [
  {
    name: 'Jake Mackie',
    title: 'Full Stack Developer',
    shortQuote:
      'TechBlitz simplifies coding concepts compared to LeetCode, offering real-world questions that make upskilling easy.',
    longQuote:
      '"After landing my first job as a Software Developer, I wanted to keep up with my peers by learning programming languages in more depth. TechBlitz made that learning curve feel less daunting compared to LeetCode. Initially, advanced JavaScript and React seemed overwhelming, but with clear question breakdowns and insightful tooltips, I realized that upskilling isn\'t as hard as it seems."',
    image: JakeMackieTestimonial,
    githubUrl: 'https://github.com/jakemackie',
  },
  {
    name: 'britishpowerlifter',
    title: 'Software Developer',
    shortQuote: 'I use TechBlitz and recommend it to anyone who wants to learn to code!',
    longQuote: 'I use TechBlitz and recommend it to anyone who wants to learn to code!',
    image: '',
  },
  {
    image: 'https://avatars.githubusercontent.com/u/40324275?v=4',
    name: 'peyz0',
    title: 'Software Developer',
    shortQuote: 'The UI is beautiful.',
    longQuote: 'The UI is beautiful.',
  },
  {
    image: '',
    name: 'aryan',
    title: 'Software Developer',
    shortQuote: 'Nice work!',
    longQuote: 'Nice work!',
  },
  {
    image:
      'https://lh3.googleusercontent.com/a/ACg8ocKtqMovHQLepQJpBb2Sm-mrY6H7NZhWu3QRLV19k1qNmJZnp7g=s96-c',
    name: 'Sathvik Reddy',
    title: 'Full Stack Developer',
    shortQuote: 'It’s very incredible and innovative , hope you develop more projects like these !',
    longQuote: 'It’s very incredible and innovative , hope you develop more projects like these !',
  },
  {
    image:
      'https://lh3.googleusercontent.com/a/ACg8ocKGKKN2Xe85gwEX2KkzY9YHVUegNucl4wA3XNTG9hZbCvLAEg=s96-c',
    name: '8 -bit',
    title: 'Software Developer',
    shortQuote: 'Woah, fantastic project! It’s incredibly helpful.',
    longQuote: 'Woah, fantastic project! It’s incredibly helpful.',
  },
];

export default function TestimonialsCarousel({
  header,
  subheader,
}: {
  header?: string;
  subheader?: string;
}) {
  return (
    <section id="testimonials" className="pb-16 pt-10 relative group">
      {/* Gradient divider */}
      <div
        aria-hidden="true"
        className="left-1/2 top-0 w-72 md:w-[600px] center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      ></div>

      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 top-20 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 h-[200px] w-[200px] rounded-full bg-accent/5 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        {/* Left column - Header */}
        <div className="flex flex-col gap-y-3 lg:w-1/3 items-center lg:items-start">
          <h2 className="text-4xl font-bold text-center lg:text-left text-gradient from-white to-white/75 py-1.5">
            {header || 'Loved by developers just like you'}
          </h2>
          <p className="text-gray-400 text-sm text-center lg:text-left max-w-md">
            {subheader ||
              'Discover how TechBlitz has empowered developers to level up their coding skills.'}
          </p>

          {/* Added subtle call to action */}
          <Button href="/signup" variant="default" className="mt-6">
            Join our growing community →
          </Button>
        </div>

        {/* Right column - Testimonials Carousel */}
        <div className="lg:w-2/3 w-full">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div
                    className={cn(
                      'flex flex-col h-full gap-4 p-5 rounded-xl border border-white/5 transition-all duration-300',
                      'bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm',
                      'hover:border-accent/20 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]'
                    )}
                  >
                    {/* Testimonial content */}
                    <p className="text-white/90 font-onest text-base leading-relaxed mb-5">
                      "{testimonial.shortQuote}"
                    </p>

                    {/* Author info */}
                    <div className="flex items-center mt-auto">
                      {testimonial.image ? (
                        <div className="relative h-12 w-12 rounded-full overflow-hidden border border-white/10">
                          <Image
                            src={testimonial.image || '/placeholder.svg'}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center border border-white/10">
                          <span className="text-accent text-lg font-semibold">
                            {testimonial.name[0].toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="ml-3">
                        <p className="font-semibold text-white font-onest">{testimonial.name}</p>
                        <p className="text-gray-400 text-sm font-onest">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-2">
              <CarouselPrevious className="relative inset-0 translate-y-0 hover:bg-accent/20 border-white/10 text-white" />
              <CarouselNext className="relative inset-0 translate-y-0 hover:bg-accent/20 border-white/10 text-white" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
