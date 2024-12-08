'use client';

import React, { useState, useEffect } from 'react';
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

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const generateRandomData = () => {
  return months.map((month) => ({
    month,
    questions: Math.floor(Math.random() * 50) + 25
  }));
};

const chartConfig = {
  questions: {
    label: 'Questions',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export default function QuestionChart() {
  const [chartData, setChartData] = useState(generateRandomData());
  const [trend, setTrend] = useState({ percentage: 25, isUp: true });

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
              <NumberFlow value={trend.percentage} />%
            </span>
            {trend.isUp ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
        </CardTitle>
        <CardDescription>Last 12 months</CardDescription>
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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-white">
          {trend.isUp ? 'Trending up' : 'Trending down'} by {trend.percentage}%
          this period
          {trend.isUp ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
