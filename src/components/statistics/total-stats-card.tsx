'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import NumberFlow from '@number-flow/react';
import { useEffect, useState } from 'react';
import { capitalise } from '@/utils';

interface TotalAnsweredQuestionsProps {
  header: string | number;
  description: string;
  className?: string;
}

export default function TotalStatsCard({
  header,
  description,
  className
}: TotalAnsweredQuestionsProps) {
  // make number go to 0, then back to the number
  // to trigger the animation
  const [number, setNumber] = useState(0);
  useEffect(() => {
    if (typeof header === 'number') {
      setNumber(0);
      setTimeout(() => {
        setNumber(header);
      }, 100);
    }
  }, [header]);

  return (
    <Card
      className={cn(
        'col-span-12 md:col-span-6 lg:col-span-3 border-none',
        className
      )}
    >
      <CardHeader className="p-3">
        <CardTitle className="text-white">
          <div className="flex items-center justify-between">
            <span className="text-2xl lg:text-4xl font-bold">
              {typeof header === 'number' ? (
                <NumberFlow
                  className="p-0"
                  value={number}
                />
              ) : (
                capitalise(header)
              )}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          'relative text-gray-400 text-sm p-3 pt-0',
          typeof header === 'number' ? '-top-3' : ''
        )}
      >
        {description}
      </CardContent>
    </Card>
  );
}
