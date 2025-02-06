'use client';

import { cn } from '@/lib/utils';
import type { Question } from '@/types/Questions';
import { uniqueId } from 'lodash';
import { useState, useEffect, type ReactNode } from 'react';

export default function QuestionCardClient({
  children,
  questionData,
  index,
  offset,
}: {
  children: ReactNode;
  questionData: Question | null;
  index: number;
  offset: number;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const key = questionData?.slug || uniqueId('study-path-question-card-skeleton-');

  return (
    <div
      key={key}
      className={cn('absolute w-full flex justify-center transition-all duration-300')}
      style={{
        top: `${index * (isMobile ? 130 : 130)}px`,
        transform: `translateX(${offset}%)`,
      }}
    >
      {children}
    </div>
  );
}
