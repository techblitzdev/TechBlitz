'use client';
import React, { useState } from 'react';
import Chip from '../ui/chip';
import DashboardQuestionCard from './dashboard-question-card';
import { ArrowRight } from 'lucide-react';
import { Grid } from '../ui/grid';

export default function AllQuestionsDashboardBentoBox() {
  const questions = [
    'What does the spread operator do?',
    "What's the difference between '==' and '==='?",
    'What will be the outcome of the following JavaScript snippet?',
    'What are the differences objects and arrays?',
    'What is the difference between .map and .forEach?',
    'Explain component lifecycle'
  ];

  // Triple the questions to ensure smooth infinite scroll
  const [allQuestions] = useState([...questions, ...questions, ...questions]);

  return (
    <section className="h-full flex flex-col gap-y-5 group p-4 relative overflow-hidden max-h-fit">
      <div className="space-y-3 z-10 relative">
        <Chip
          color="accent"
          text="Questions"
        />
        <h6 className="text-lg lg:text-xl flex items-center">
          View all Questions
          <ArrowRight className="size-4 inline-block ml-1 group-hover:ml-2 duration-300" />
        </h6>
      </div>

      <div className="relative overflow-hidden mt-3 md:h-64 xl:h-[17rem]">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#000] to-transparent z-10" />
        {/* Top fade effect */}

        {/* Scrolling content */}
        <div
          className="animate-scroll hover:pause-animation relative z-0"
          style={
            { '--question-count': questions.length } as React.CSSProperties
          }
        >
          {allQuestions.map((question, index) => (
            <DashboardQuestionCard
              key={`${question}-${index}`}
              question={question}
            />
          ))}
        </div>

        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#000] to-transparent z-10" />
      </div>
    </section>
  );
}
