'use client';
import React, { useState } from 'react';
import Chip from '../../global/chip';
import DashboardQuestionCard from './dashboard-question-card';
import { Arrow } from '@radix-ui/react-tooltip';
import { ArrowRight } from 'lucide-react';

export default function AllQuestionsDashboardBentoBox() {
  const questions = [
    'What does the spread operator do?',
    "What's the difference between '==' and '==='?",
    'What will be the outcome of the following JavaScript snippet?',
    'What are the differences objects and arrays?',
    'What is the difference between .map and .forEach?',
    'Explain component lifecycle',
  ];

  // Triple the questions to ensure smooth infinite scroll
  const [allQuestions] = useState([...questions, ...questions, ...questions]);

  return (
    <section className="h-full flex flex-col gap-y-5 group">
      <div className="space-y-3">
        <Chip color="accent" text="Questions" />
        <h6 className="text-lg lg:text-xl flex items-center">
          View all Questions
          <ArrowRight className="w-4 h-4 inline-block ml-1 group-hover:ml-2 duration-300" />
        </h6>
      </div>

      <div className="relative overflow-hidden mt-3 h-64">
        <div
          className="animate-scroll hover:pause-animation"
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
      </div>
    </section>
  );
}
