import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PersonalizedRight() {
  const questions = [
    {
      uid: '1',
      question: 'How to use map, reduce, and filter in JavaScript?',
      slug: 'javascript-array-map-reduce-filter-output',
    },
    {
      uid: '2',
      question: 'How to handle state mutation in React?',
      slug: 'react-state-mutation-issue-and-solution',
    },
    {
      uid: '3',
      question: 'How to use dynamic import in JavaScript?',
      slug: 'dynamic-import-module-javascript-async',
    },
    {
      uid: '4',
      question: 'How to implement a collaborative editor with WebSocket in React?',
      slug: 'react-collaborative-editor-websocket-hook-implementation',
    },
    {
      uid: '5',
      question: 'How to handle errors in Promise.all?',
      slug: 'promise-all-error-handling-results',
    },
  ];

  return (
    <div className="col-span-full md:col-span-6 pb-0 md:py-12 pt-4 p-0 md:p-12 flex flex-col gap-10">
      <div className="flex flex-col gap-y-10 h-72 overflow-hidden relative">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h2 className="text-lg font-semibold">Custom Questions</h2>
          <p className="text-sm text-gray-400 text-center">
            These coding questions have been generated based on your report for{' '}
            {new Date().toLocaleDateString()}.
          </p>
        </div>
        <div
          className={cn(
            'flex flex-col overflow-hidden divide-y-[1px] divide-black-50 border border-black-50 rounded-md'
          )}
        >
          {questions?.map((question, index) => (
            <Link
              key={question.uid}
              className={cn(
                'p-3 truncate w-full flex gap-3 justify-between items-center group',
                index % 2 === 0 ? 'bg-[#000] hover:bg-black-100' : 'bg-black hover:bg-black-75'
              )}
              href={`/question/${question.slug}`}
              target="_blank"
            >
              <p className="text-sm font-satoshi line-clamp-1">{question.question}</p>
              <ArrowRight className="size-3 mr-1 group-hover:mr-0 duration-300 flex-shrink-0" />
            </Link>
          ))}
        </div>
        <div className="z-10 absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-3xl text-gradient from-white to-white/75">
          Coding reports just for you
        </h3>
        <p className="text-gray-400 font-onest">
          Customized coding reports generated from your current TechBlitz journey. Reports are the
          ultimate way to improve your coding skills faster.
        </p>
        <Button
          variant="secondary"
          href="/features/statistics"
          className="w-fit flex items-center gap-1"
        >
          Learn more
          <ChevronRight className="size-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}
