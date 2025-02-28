'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import QuestionChart from '@/components/app/statistics/total-question-chart';
import SkewedQuestionCards from './skewed-question-cards';
import { capitalise, generateFakeData, getQuestionDifficultyColor } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import Chip from '@/components/ui/chip';
import { Button } from '@/components/ui/button';

const tags = [
  {
    id: 1,
    name: 'Array methods',
    title: 'Array methods',
    questionContent: 'What is the main advantage of using the reduce method?',
    difficulty: 'EASY',
  },
  {
    id: 2,
    name: 'React hooks',
    title: 'React hooks',
    questionContent: 'What are the disadvantages of using the useEffect hook?',
    difficulty: 'HARD',
  },
  {
    id: 3,
    name: 'Async',
    title: 'Async',
    questionContent: 'What will the following asynchronous code return?',
    difficulty: 'MEDIUM',
  },
];

const QuestionCard = ({ tag }: { tag: (typeof tags)[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-black-100 border border-black-50 p-4 rounded-lg shadow-lg"
  >
    <h3 className="text-xl font-semibold mb-2">{tag.title}</h3>
    <p className="text-gray-400 mb-3">{tag.questionContent}</p>
    <Chip
      color={getQuestionDifficultyColor(tag.difficulty).bg}
      text={capitalise(tag.difficulty)}
      textColor={getQuestionDifficultyColor(tag.difficulty).text}
      border={getQuestionDifficultyColor(tag.difficulty).border}
    />
  </motion.div>
);

export default function StatsReportSection(opts: {
  header?: string;
  subheader?: string;
  learnMoreLink?: boolean;
}) {
  const { header, subheader, learnMoreLink } = opts;
  const [activeTag, setActiveTag] = useState(tags[0].id);
  const [isAnimating, setIsAnimating] = useState(false);

  // memoize the fake stats data to stop re-rendering the component when the
  // tag animation is triggered
  const fakeStatsData = useMemo(() => generateFakeData(30), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveTag((prevTag) => {
          const nextIndex = (tags.findIndex((tag) => tag.id === prevTag) + 1) % tags.length;
          return tags[nextIndex].id;
        });
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="statistics-report"
      className="py-8 sm:py-12 md:py-28 px-4 flex flex-col gap-y-8 sm:gap-y-12 md:gap-y-16 relative"
    >
      <div className="flex flex-col gap-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl text-gradient from-white to-white/75 font-onest! font-medium! tracking-tight py-1.5">
          {header ? (
            header
          ) : (
            <>
              Detailed Analytics & Progress <br /> Reports to Accelerate Your Growth
            </>
          )}
        </h2>
        <p className="text-gray-400 max-w-5xl text-sm sm:text-base md:text-lg">
          {subheader
            ? subheader
            : 'Get actionable insights with personalized performance analytics. Track your coding journey, identify areas for improvement, and celebrate your achievements with comprehensive progress reports.'}
        </p>
        {learnMoreLink && (
          <Button variant="secondary" href={'/features/statistics'}>
            Learn more
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
        <div className="lg:col-span-5 flex flex-col gap-y-6 relative">
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col">
                <h6 className="text-xl sm:text-2xl lg:text-4xl text-gradient from-white to-white/75 font-onest! font-medium! tracking-tight py-1.5">
                  Customised Questions
                </h6>
                <p className="text-gray-400 w-full sm:w-3/4">
                  Question created based on your report to help you improve your skills.
                </p>
              </div>
              <SkewedQuestionCards />
            </div>
            <div className="flex flex-col gap-y-4 relative p-4 min-h-[500px] sm:min-h-[350px] md:min-h-[350px]">
              <div
                aria-hidden="true"
                className="left-1/2 top-0 w-full center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2 bg-black-50"
              ></div>
              <div className="flex flex-col">
                <h6 className="text-xl sm:text-2xl lg:text-4xl text-gradient from-white to-white/75 font-onest! font-medium! tracking-tight py-1.5">
                  Tag overview
                </h6>
                <p className="text-gray-400">
                  Instantly identify your skill gaps and transform weaknesses into mastery with our
                  targeted learning recommendations.
                </p>
              </div>
              <div className="flex flex-col gap-y-6 sm:gap-y-10 h-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {tags.map((tag) => (
                    <motion.div
                      key={tag.id}
                      animate={{
                        scale: activeTag === tag.id ? 1.1 : 1,
                        opacity: activeTag === tag.id ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge
                        variant="secondary"
                        className={`bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-colors w-fit cursor-pointer ${
                          activeTag === tag.id ? 'ring-2 ring-red-500' : ''
                        }`}
                        onClick={() => setActiveTag(tag.id)}
                      >
                        {tag.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {!isAnimating && (
                    <QuestionCard
                      key={activeTag}
                      tag={tags.find((tag) => tag.id === activeTag) || tags[0]}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="hidden lg:block absolute right-0 top-0 h-full w-px pointer-events-none bg-black-50"
          ></div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-y-6 sm:gap-y-8">
          <div className="flex flex-col">
            <h6 className="text-xl sm:text-2xl lg:text-4xl text-gradient from-white to-white/75 font-onest! font-medium! tracking-tight py-1.5">
              Progress report
            </h6>
            <p className="text-gray-400 w-full sm:w-3/4">
              Visualize your progress in an easy to digest format. View your progress over time and
              see how you&apos;re progressing.
            </p>
          </div>
          <div className="relative w-full">
            <div className="relative sm:scale-100 md:scale-110 lg:scale-[1.2] sm:top-12 md:top-16 lg:top-24 sm:-right-8 md:-right-16 lg:-right-24">
              <Suspense>
                <QuestionChart questionData={fakeStatsData} step="day" backgroundColor="bg-black" />
              </Suspense>
              <div className="z-10 absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#000] to-transparent pointer-events-none"></div>
              <div className="z-10 absolute inset-y-0 -right-4 md:right-0 w-20 bg-linear-to-l from-[#000] to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
