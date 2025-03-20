import AnimatedSpan from '@/components/ui/animated-span';
import { cn } from '@/lib/utils';
import PersonalizedLeft from './left';
import PersonalizedRight from './right';

interface PersonalizedBlockProps {
  paddingTop?: `pt-${number}`;
  paddingBottom?: `pb-${number}`;
}

export default function Personalized({
  paddingTop = 'pt-10',
  paddingBottom = 'pb-28',
}: PersonalizedBlockProps) {
  return (
    <section className={cn(paddingTop, paddingBottom, 'md:container flex flex-col gap-10')}>
      <div className="flex flex-col gap-2.5 md:px-12">
        <AnimatedSpan content="Personalized Learning" />
        <h2 className="text-3xl lg:text-5xl font-onest !font-medium tracking-tight text-gradient from-white to-white/55 py-1">
          Learn to code faster with AI-powered feedback
        </h2>
        <p className="text-gray-400">
          Learn the basics of web development with immediate AI support, tailored practice
          challenges, and personalized coding roadmaps crafted for your success.
        </p>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-12 gap-10 self-center relative">
        <div
          aria-hidden="true"
          className="hidden lg:block left-1/2 top-0 w-full center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
        <PersonalizedLeft />
        <PersonalizedRight />
      </div>
    </section>
  );
}
