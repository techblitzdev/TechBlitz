'use client';

import { TrendingUp } from 'lucide-react';
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { getUserDailyStats } from '@/actions/user/get-daily-streak';
import LoadingSpinner from '../ui/loading';

export const description = 'A radial chart with text';

export function DailyStreakChart() {
  const { data: user } = useUser();
  const { data, error, isLoading } = useQuery({
    queryKey: ['user', user?.user?.id],
    queryFn: () => {
      if (!user || !user.user || !user?.user.id) return;
      return getUserDailyStats(user?.user.id);
    },
  });

  if (isLoading || !data?.correctDailyStreak || !data.totalDailyStreak)
    return (
      <CardDescription>
        <LoadingSpinner />
      </CardDescription>
    );

  const chartData = [
    {
      name: 'streak',
      streak: data?.totalDailyStreak,
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
            endAngle={
              90 + (data?.correctDailyStreak / data?.totalDailyStreak) * 360
            }
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
                          {data.correctDailyStreak} / {data.totalDailyStreak}
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
