'use client';

import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import NumberFlow from '@number-flow/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const chartConfig = {
  questions: {
    label: 'Questions',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export default function QuestionChart({
  questionData
}: {
  questionData: StatsChartData;
}) {
  const chartData = useMemo(() => {
    const entries = Object.entries(questionData);
    const sortedEntries = entries.sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
    );
    const monthCount = sortedEntries.length;

    if (monthCount < 3) {
      // Convert to weekly or daily data
      const allDates = sortedEntries.flatMap(([month, data]) => {
        const [year, monthNum] = month.split('-');
        const daysInMonth = new Date(
          Number(year),
          Number(monthNum),
          0
        ).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const date = `${year}-${monthNum.padStart(2, '0')}-${day
            .toString()
            .padStart(2, '0')}`;
          return [date, data.totalQuestions / daysInMonth];
        });
      });

      if (monthCount < 1) {
        // Daily data
        return allDates.map(([date, questions]) => ({
          date: new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          }),
          questions: Math.round(Number(questions))
        }));
      } else {
        // Weekly data
        const weeklyData: { [week: string]: number } = {};
        allDates.forEach(([date, questions]) => {
          const week = getWeekNumber(new Date(date));
          weeklyData[week] = (weeklyData[week] || 0) + Number(questions);
        });
        return Object.entries(weeklyData).map(([week, questions]) => ({
          date: `Week ${week}`,
          questions: Math.round(questions)
        }));
      }
    } else {
      // Monthly data (original logic)
      return sortedEntries.map(([month, data]) => ({
        date: new Date(month).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        }),
        questions: data.totalQuestions
      }));
    }
  }, [questionData]);

  const trend = useMemo(() => {
    const lastPeriod = chartData[chartData.length - 1];
    const previousPeriod = chartData[chartData.length - 2];

    if (lastPeriod && previousPeriod) {
      const percentageChange =
        ((lastPeriod.questions - previousPeriod.questions) /
          previousPeriod.questions) *
        100;
      return {
        percentage: Math.abs(percentageChange).toFixed(2),
        isUp: percentageChange > 0
      };
    }

    return { percentage: 0, isUp: true };
  }, [chartData]);

  const periodText = useMemo(() => {
    const monthCount = Object.keys(questionData).length;
    if (monthCount < 1) return 'days';
    if (monthCount < 3) return 'weeks';
    return 'months';
  }, [questionData]);

  return (
    <Card
      className="border-black-50 max-h-[28rem]"
      style={{
        background:
          'radial-gradient(128% 107% at 100% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)'
      }}
    >
      <CardHeader>
        <CardTitle className="text-white w-full flex justify-between items-center">
          <span>Questions Answered </span>
          <div className="flex gap-1 items-center text-sm font-medium leading-none text-white">
            <span className="flex items-center">
              <NumberFlow value={Number(trend.percentage)} />%
            </span>
            {trend.isUp ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
        </CardTitle>
        <CardDescription>
          Last {chartData.length} {periodText}
        </CardDescription>
      </CardHeader>
      <CardContent className="border-black-50 max-h-[28rem]">
        <ChartContainer
          config={chartConfig}
          className="max-h-80"
          style={{
            aspectRatio: '9 / 2'
          }}
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.split(' ')[0]}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              width={30}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="questions"
              type="natural"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{
                fill: 'hsl(var(--accent))'
              }}
              activeDot={{
                r: 6
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// Helper function to get week number
function getWeekNumber(date: Date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export interface StatsChartData {
  [month: string]: {
    totalQuestions: number;
    tagCounts: Record<string, number>;
  };
}
