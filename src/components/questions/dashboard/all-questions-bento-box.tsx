'use client';
import React, { useState } from 'react';
import Chip from '../../global/chip';
import DashboardQuestionCard from './dashboard-question-card';

export default function AllQuestionsDashboardBentoBox() {
  const questions = [
    'What does the spread operator do?',
    "What's the difference between '==' and '==='?",
    'How to use React hooks?',
    'What is the difference between state and props?',
    'What is the difference between .map and .forEach?',
    'Explain component lifecycle',
  ];

  // Triple the questions to ensure smooth infinite scroll
  const [allQuestions] = useState([...questions, ...questions, ...questions]);

  return (
    <section className="h-full flex flex-col gap-y-5">
      <div className="space-y-3">
        <Chip color="accent" text="Questions" />
        <h6 className="text-lg lg:text-xl">View all Questions</h6>
      </div>

      <div className="relative overflow-hidden" style={{ height: '280px' }}>
        <div
          className="animate-scroll"
          style={{
            animation: 'scroll 30s linear infinite',
          }}
        >
          {allQuestions.map((question, index) => (
            <DashboardQuestionCard
              key={`${question}-${index}`}
              question={question}
            />
          ))}
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-${questions.length * 72}px);
            }
          }
          .animate-scroll {
            will-change: transform;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}
