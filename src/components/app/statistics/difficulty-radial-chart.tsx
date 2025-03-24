'use client';

import { useMemo } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { StatsChartData } from '@/types/Stats';
import { Button } from '@/components/ui/button';

// Define colors for each difficulty
// Use the same difficulty colors as defined in the app's utility functions
const DIFFICULTY_COLORS = {
  BEGINNER: '#3b82f6', // blue-500
  EASY: '#22c55e', // green-500
  MEDIUM: '#eab308', // yellow-500
  HARD: '#ef4444', // red-500
};

// Map difficulty to friendly names
const DIFFICULTY_LABELS = {
  BEGINNER: 'Beginner',
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

export default function DifficultyRadialChart({ questionData }: { questionData: StatsChartData }) {
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
        // Calculate the angle for the radial chart
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

  // Generate a legend that shows both counts and percentages
  const LegendContent = () => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {difficultyData.chartData.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.fill }}
            ></div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{entry.name}</span>
              <span className="text-xs text-gray-400">
                {entry.value} ({entry.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {difficultyData.grandTotal > 0 ? (
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="10%"
              outerRadius="80%"
              barSize={25}
              data={difficultyData.chartData}
            >
              <RadialBar
                background={{ fill: '#090909' }}
                label={{
                  position: 'insideStart',
                  fill: '#fff',
                  fontSize: 12,
                  formatter: (value: number) => value,
                }}
                dataKey="value"
              />
              <Tooltip
                formatter={(value: number) => [
                  `${value} (${((value / difficultyData.grandTotal) * 100).toFixed(1)}%)`,
                  'Questions',
                ]}
                contentStyle={{
                  backgroundColor: '#090909',
                  borderColor: '#2d2d2d',
                  borderRadius: '6px',
                }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: '#fff' }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 h-[300px]">
          <p className="text-lg text-muted-foreground text-center">
            No difficulty data available due to lack of questions answered
          </p>
          <Button href="/questions">Start answering now</Button>
        </div>
      )}
    </>
  );
}
