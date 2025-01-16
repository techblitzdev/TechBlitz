import { cn } from '@/lib/utils';
import Marquee from '@/components/ui/marquee';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import Chip from '@/components/ui/chip';

const questions = [
  {
    uid: '1',
    question: 'How to use map, reduce, and filter in JavaScript?',
    slug: 'javascript-array-map-reduce-filter-output',
    difficulty: 'BEGINNER',
  },
  {
    uid: '2',
    question: 'How to handle state mutation in React?',
    slug: 'react-state-mutation-issue-and-solution',
    difficulty: 'EASY',
  },
  {
    uid: '3',
    question: 'How to use dynamic import in JavaScript?',
    slug: 'dynamic-import-module-javascript-async',
    difficulty: 'EASY',
  },
  {
    uid: '4',
    question:
      'How to implement a collaborative editor with WebSocket in React?',
    slug: 'react-collaborative-editor-websocket-hook-implementation',
    difficulty: 'HARD',
  },
  {
    uid: '5',
    question: 'How to handle errors in Promise.all?',
    slug: 'promise-all-error-handling-results',
    difficulty: 'MEDIUM',
  },
  {
    uid: '6',
    question: 'How to transform an array with filter, map, and reduce',
    slug: 'array-transformation-filter-map-reduce-result',
    difficulty: 'MEDIUM',
  },
];

const firstRow = questions.slice(0, questions.length / 2);
const secondRow = questions.slice(questions.length / 2);

export const QuestionCard = ({
  question,
  slug,
  difficulty,
}: {
  question: string;
  slug: string;
  difficulty: string;
}) => {
  const difficultyColor = getQuestionDifficultyColor(difficulty);

  return (
    <Card
      className={cn(
        'w-full max-w-xs cursor-pointer overflow-hidden transition-all duration-300 ease-in-out',
        'border border-black-50'
      )}
      style={{
        background:
          'radial-gradient(128% 107% at 50% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
      }}
    >
      <CardContent className="p-6 flex flex-col gap-y-2">
        <div className="flex w-full justify-between items-center">
          <Chip
            text={capitalise(difficulty)}
            color={difficultyColor.bg}
            textColor={difficultyColor.text}
            border={difficultyColor.border}
          />
        </div>
        <h3 className="font-semibold mb-2 text-white line-clamp-2">
          {question}
        </h3>
      </CardContent>
      <CardFooter>
        <Link
          href={`/question/${slug}`}
          className={cn(
            'flex items-center text-sm font-medium text-white',
            'hover:text-accent-foreground transition-colors duration-200'
          )}
        >
          Learn now!
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default function QuestionMarquee({
  header,
  subheader,
}: {
  header: string;
  subheader: string;
}) {
  return (
    <section className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background pt-12 pb-12 md:pt-12 md:pb-36">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 text-gradient from-white/55 to-white py-1">
        {header}
      </h2>
      <p className="text-center mb-8 text-gradient from-white/55 to-white">
        {subheader}
      </p>

      <div className="relative w-full">
        <Marquee pauseOnHover className="[--duration:20s] mb-8">
          {firstRow.map((question) => (
            <div key={question.uid} className="mx-4">
              <QuestionCard {...question} />
            </div>
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="[--duration:20s] hidden md:flex"
        >
          {secondRow.map((question) => (
            <div key={question.uid} className="mx-4">
              <QuestionCard {...question} />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#000000] dark:from-gray-900"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#000000] dark:from-gray-900"></div>
      </div>
    </section>
  );
}
