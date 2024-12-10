'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import NumberFlow from '@number-flow/react';
import { useEffect, useState } from 'react';

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
    <Card className={cn('col-span-12 lg:col-span-3 border-none', className)}>
      <CardHeader className="p-3">
        <CardTitle className="text-white">
          <div className="flex items-center justify-between">
            <span className="text-5xl font-bold text-white">
              {typeof header === 'number' ? (
                <NumberFlow value={number} />
              ) : (
                header
              )}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-white p-3 pt-0">{description}</CardContent>
    </Card>
  );
}
