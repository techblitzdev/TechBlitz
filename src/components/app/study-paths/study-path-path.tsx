'use client';

import type React from 'react';
import type { Questions } from '@prisma/client';
import type { StudyPath } from '@prisma/client';
import QuestionCard from '@/components/app/layout/questions/question-card';

interface RoadmapPathProps {
  questions: Questions[];
  studyPath: StudyPath;
}

const RoadmapPath: React.FC<RoadmapPathProps> = ({ questions, studyPath }) => {
  const pathHeight = questions.length * 200; // Adjust this value to change the spacing between questions

  return (
    <div className="relative w-full" style={{ height: `${pathHeight}px` }}>
      <svg className="absolute top-0 left-0 w-full h-full">
        <path
          d={`M100,0 Q150,${pathHeight / 4} 50,${pathHeight / 2} T100,${pathHeight}`}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
        />
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
      </svg>
      {questions.map((question) => (
        <QuestionCard
          key={question.slug}
          questionData={question}
          identifier="slug"
          user={null}
          numberOfTags={3}
          type="study-path"
          showSubmissions={false}
          studyPathSlug={studyPath.slug}
        />
      ))}
    </div>
  );
};

export default RoadmapPath;
