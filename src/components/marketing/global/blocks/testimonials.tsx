import Image from 'next/image';
import JakeMackieTestimonial from '@/public/images/testimonials/jake-mackie-techblitz-testimonial.jpeg';

import Link from 'next/link';
import GithubLogo from '@/components/ui/icons/github';

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
  /**
  {
    {
      image: 'https://avatars.githubusercontent.com/u/40324275?v=4',
      name: '',
      title: 'Software Developer',
      shortQuote: 'The UI is beautiful.',
      longQuote: 'The UI is beautiful.',
    },
  },
  */
];

export default function Testimonials(opts: { header?: string; subheader?: string }) {
  return (
    <section id="testimonials" className="pb-16 pt-10 relative group">
      <div
        aria-hidden="true"
        className="left-1/2 top-0 w-72 md:w-[600px] center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      ></div>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        <div className="flex flex-col gap-y-1 lg:w-1/3 items-center lg:items-start">
          <h2 className="text-4xl font-bold text-center lg:text-left text-gradient from-white to-white/75 py-1.5">
            {opts.header || 'Loved by developers just like you'}
          </h2>
          <p className="text-gray-400 text-sm text-center lg:text-left">
            Discover how TechBlitz has empowered developers to level up their coding skills.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 lg:w-2/3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col gap-4 rounded-lg shadow-lg items-center lg:items-start"
            >
              <div className="flex items-center order-first lg:order-first mb-0 lg:mb-4">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={52}
                    height={52}
                    className="rounded-full mb-0 lg:mr-4"
                  />
                ) : (
                  <div className="w-[52px] h-[52px] rounded-full bg-accent/10 flex items-center justify-center mb-4 lg:mb-0 lg:mr-4">
                    <span className="text-accent text-lg font-semibold">
                      {testimonial.name[0].toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="ml-1">
                  <p className="font-semibold text-white font-onest">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm font-onest">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-white font-onest text-base lg:text-lg text-center lg:text-left">
                "{testimonial.shortQuote}"
              </p>
              <div className="h-5">
                {testimonial.githubUrl && (
                  <Link
                    href={testimonial.githubUrl}
                    target="_blank"
                    className="opacity-0 group-hover:opacity-100 text-gray-400 text-sm font-onest flex order-last items-center gap-2 group-hover:text-accent transition-opacity duration-300 mt-0 lg:mt-2"
                  >
                    <GithubLogo className="w-4 h-4" />
                    Check out {testimonial.name.split(' ')[0]}'s work on GitHub!
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
