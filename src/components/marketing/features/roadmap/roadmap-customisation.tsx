import RoadmapQuestionCard from '@/components/app/roadmaps/questions/[uid]/question-card';
import AnimatedSpan from '@/components/ui/animated-span';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { RoadmapUserQuestions } from '@/types/Roadmap';

const dummyQuestions: Partial<RoadmapUserQuestions>[] = [
  {
    uid: 'find-largest-number',
    question: 'Find the Largest Number in an Array',
    difficulty: 'EASY',
    completed: true,
    userCorrect: true,
  },
  {
    uid: 'question-2',
    question: 'Explain the difference between REST and GraphQL.',
    difficulty: 'MEDIUM',
    completed: true,
    userCorrect: false,
  },
  {
    uid: 'question-3',
    question: 'How do you handle state management in React?',
    difficulty: 'EASY',
    completed: true,
    userCorrect: true,
  },
  {
    uid: 'question-4',
    question: 'Describe the concept of closures in JavaScript.',
    difficulty: 'MEDIUM',
    completed: true,
    userCorrect: false,
  },
];

const dummyRoadmapUid = 'roadmap-12345';

const dummyTotalQuestions = dummyQuestions.length;

interface FeatureRoadmapCustomizationBlockProps {
  className?: string;
  cta?: {
    title: string;
    href: string;
  };
}

export default function FeatureRoadmapCustomizationBlock({
  className,
  cta,
}: FeatureRoadmapCustomizationBlockProps) {
  return (
    <section
      id="roadmap-customization"
      className={cn(
        'pt-24 pb-32 grid grid-cols-12 gap-12 items-center overflow-hidden relative',
        className
      )}
    >
      <div className="flex flex-col gap-y-4 col-span-full md:col-span-5">
        <AnimatedSpan content="Personalized" />
        <h2 className="text-2xl lg:text-5xl !font-sans !leading-[normal] text-gradient from-white to-white/55">
          Your personalized coding roadmap.
        </h2>
        <p className="text-gray-400 max-w-3xl">
          Start your journey to learn to code with our AI-powered learning paths. Whether you're a
          beginner or advancing your skills, we'll create a personalized programming roadmap to
          guide your tech skills progression.
        </p>
        {cta && (
          <Button variant="secondary" href={cta.href} className="w-fit">
            {cta.title}
          </Button>
        )}
      </div>
      <div className="col-span-full md:col-span-7 max-h-[26rem] relative -right-4">
        {dummyQuestions.map((question, index) => (
          <RoadmapQuestionCard
            key={question.uid}
            question={question}
            roadmapUid={dummyRoadmapUid}
            index={index}
            totalQuestions={dummyTotalQuestions}
            prevQuestionCorrect={index > 0 ? dummyQuestions[index - 1]?.userCorrect : undefined}
            prevQuestionAnswered={index > 0 ? dummyQuestions[index - 1]?.completed : undefined}
          />
        ))}
      </div>
      <div className="z-10 absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
      <div className="z-10 absolute inset-y-0 right-0 h-full w-44 bg-gradient-to-l from-[#000] to-transparent pointer-events-none"></div>
    </section>
  );
}
