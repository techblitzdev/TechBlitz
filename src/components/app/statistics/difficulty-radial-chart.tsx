'use client';

import { useMemo } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { StatsChartData, DifficultyRecord } from '@/types/Stats';
import { Button } from '@/components/ui/button';

// Define colors for each difficulty
const DIFFICULTY_COLORS = {
  BEGINNER: 'hsl(var(--chart-1))', // blue
  EASY: 'hsl(var(--chart-2))', // green
  MEDIUM: 'hsl(var(--chart-3))', // yellow
  HARD: 'hsl(var(--chart-4))', // red
};

// Map difficulty to friendly names
const DIFFICULTY_LABELS = {
  BEGINNER: 'Beginner',
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

export default function DifficultyRadialChart({
  questionData,
  step,
  backgroundColor,
}: {
  questionData: StatsChartData;
  step: 'day' | 'week' | 'month';
  backgroundColor?: string;
}) {
  // Calculate total questions by difficulty
  const difficultyData = useMemo(() => {
    // Create object to store totals by difficulty
    const totalsByDifficulty: Record<string, number> = {};
    let grandTotal = 0;

    // Sum up all question counts by difficulty across all time periods
    Object.values(questionData).forEach((data) => {
      // Only process entries that have difficulties data
      if (data.difficulties) {
        Object.entries(data.difficulties).forEach(([difficulty, count]) => {
          // Ensure count is treated as a number
          const countValue = count ? Number(count) : 0;
          totalsByDifficulty[difficulty] = (totalsByDifficulty[difficulty] || 0) + countValue;
          grandTotal += countValue;
        });
      }
    });

    // Convert to array format for radial chart
    // Sort from highest to lowest count for better visualization
    const chartData = Object.entries(totalsByDifficulty)
      .filter(([_, count]) => count > 0) // Only include non-zero counts
      .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
      .map(([difficulty, count], index) => {
        // Higher index means smaller inner radius for the radial bar
        return {
          name: DIFFICULTY_LABELS[difficulty as keyof typeof DIFFICULTY_LABELS] || difficulty,
          value: count,
          difficulty,
          fill: DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS] || '#888',
          percentage: grandTotal > 0 ? ((count / grandTotal) * 100).toFixed(1) : '0',
        };
      });

    return { chartData, grandTotal };
  }, [questionData]);

  // Custom Legend that shows the count and percentage
  const CustomizedLegend = ({ payload }: any) => {
    if (!payload || payload.length === 0) return null;

    return (
      <ul className="flex flex-col gap-2 text-sm mt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-foreground">{entry.value}</span>
            <span className="text-muted-foreground">
              {difficultyData.chartData.find((item) => item.name === entry.value)?.value || 0}{' '}
              questions (
              {difficultyData.chartData.find((item) => item.name === entry.value)?.percentage || 0}
              %)
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {difficultyData.grandTotal > 0 ? (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="80%"
              barSize={20}
              data={difficultyData.chartData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                background
                label={{ fill: 'hsl(var(--foreground))', position: 'insideStart' }}
                dataKey="value"
              />
              <Legend
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                align="right"
                content={<CustomizedLegend />}
              />
              <Tooltip
                formatter={(value: number) => [
                  `${value} (${((value / difficultyData.grandTotal) * 100).toFixed(1)}%)`,
                  'Questions',
                ]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-lg text-muted-foreground text-center">
            No difficulty data available due to lack of questions answered
          </p>
          <Button href="/questions">Start answering now</Button>
        </div>
      )}
    </>
  );
}
