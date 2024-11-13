'use client';
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';

import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import LoadingSpinner from '@/components/ui/loading';

export const description = 'A radial chart with text';

export function DailyStreakChart(opts: { userStreakData: number }) {
  const { userStreakData } = opts;

  if (userStreakData === 0) {
    return (
      <CardDescription>
        <span className="text-center text-lg font-satoshi text-white">
          You haven&apos;t answered any questions yet!
        </span>
      </CardDescription>
    );
  }

  const chartData = [
    {
      name: 'streak',
      streak: userStreakData,
      fill: 'lightgreen',
    },
  ];

  const chartConfig = {
    streak: {
      label: 'Daily Streak',
      color: 'white',
    },
    totalStreak: {
      label: 'totalStreak',
      color: 'black',
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col bg-transparent border-none shadow-none">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[180px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-black last:fill-black-75"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="streak"
              background
              cornerRadius={10}
              className="bg-black-50"
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-xl font-bold fill-white font-inter"
                        >
                          {userStreakData} day
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white font-inter"
                        >
                          Streak!🔥
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
