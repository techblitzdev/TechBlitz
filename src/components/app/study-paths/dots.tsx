'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Question } from '@/types/Questions';

export default function Dots({ sortedQuestions }: { sortedQuestions: Question[] }) {
  const [centerX, setCenterX] = useState(0);

  const updateCenter = useCallback(() => {
    const width = document.documentElement.clientWidth;
    setCenterX(width / 2); // Center of the screen
  }, []);

  useEffect(() => {
    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, [updateCenter]);

  return (
    <svg
      className="absolute top-0 w-full h-full z-0 pointer-events-none"
      style={{ minHeight: `${sortedQuestions.length * 120}px` }}
    >
      {sortedQuestions.map((_, index) => {
        if (index === sortedQuestions.length - 1) return null;

        // Match the sine wave pattern from the question cards
        const currentOffset = Math.sin(index * 0.9) * 4;
        const nextOffset = Math.sin((index + 1) * 0.9) * 4;

        const y1 = index * 120 + 60;
        const y2 = (index + 1) * 120 + 60;

        // Calculate x positions based on the sine wave, centered on the screen
        const x1 = centerX + currentOffset * 10;
        const x2 = centerX + nextOffset * 10;

        // Create smooth curve between points
        const controlX = (x1 + x2) / 2;
        const controlY = (y1 + y2) / 2;

        // Create path for curved line
        const path = `M${x1},${y1} Q${controlX},${controlY} ${x2},${y2}`;

        // Calculate dot positions along the curve
        const dots = Array.from({ length: 4 }, (_, i) => {
          const t = i / 3;
          const t1 = 1 - t;
          // Quadratic Bezier curve formula
          const x = t1 * t1 * x1 + 2 * t1 * t * controlX + t * t * x2;
          const y = t1 * t1 * y1 + 2 * t1 * t * controlY + t * t * y2;
          return { x, y };
        });

        return (
          <g key={`connector-${index}`} className="lg:-translate-x-1/2 xl:-translate-x-3/4">
            <path d={path} fill="none" stroke="#6265D0" strokeWidth="2" strokeDasharray="4 4" />
            {dots.map((dot, i) => (
              <circle key={`dot-${index}-${i}`} cx={dot.x} cy={dot.y} r="4" fill="#6265D0" />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
