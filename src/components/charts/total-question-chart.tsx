'use client';

import React, { useMemo, useState } from 'react';
import { TrendingUp, TrendingDown, Circle } from 'lucide-react';
import NumberFlow from '@number-flow/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Tooltip from './tooltip';
import { LineChart } from './line-chart';

export interface StatsChartData {
  [key: string]: {
    totalQuestions: number;
    tagCounts: Record<string, number>;
    tags: string[];
  };
}

export default function QuestionChart({
  questionData,
  step,
  backgroundColor,
}: {
  questionData: StatsChartData;
  step: 'day' | 'week' | 'month';
  backgroundColor?: string;
}) {
  const chartData = useMemo(() => {
    const entries = Object.entries(questionData);

    // Sort entries by date - latest first
    entries.sort((a, b) => {
      const [dateA] = a;
      const [dateB] = b;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    // Directly use the keys as they should now be pre-formatted
    return entries.map(([date, data]) => ({
      date: date.split(',')[0],
      questions: data.totalQuestions,
    }));
  }, [questionData]);

  // order the chart data by the date. Ensuring that the oldest date is first
  const orderedChartData = useMemo(() => {
    return [...chartData].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [chartData]);

  // Add debugging for chart data
  console.log('Chart data:', orderedChartData);
  console.log('Categories:', ['questions']);
  console.log(
    'Chart data keys:',
    orderedChartData.length > 0 ? Object.keys(orderedChartData[0]) : []
  );

  const trend = useMemo(() => {
    // if there is less than 2 periods, return 0
    if (orderedChartData.length < 2) {
      return { percentage: 0, isNeutral: true };
    }

    // get the first and last period of the chart data
    const firstPeriod = orderedChartData[0];
    const lastPeriod = orderedChartData[orderedChartData.length - 1];

    // Handle case where first period has 0 questions
    if (firstPeriod.questions === 0) {
      if (lastPeriod.questions === 0) {
        return { percentage: 0, isNeutral: true };
      }
      // If starting from 0, treat as 0 * lastPeriod.questions increase
      return {
        percentage: 100 * lastPeriod.questions,
        isNeutral: false,
        isUp: true,
      };
    }

    // calculate the percentage change between the first and last period
    const percentageChange =
      ((lastPeriod.questions - firstPeriod.questions) / firstPeriod.questions) * 100;

    return {
      percentage: Math.abs(percentageChange).toFixed(2),
      isNeutral: percentageChange === 0,
      isUp: percentageChange > 0,
    };
  }, [orderedChartData]);

  // Format value for the chart to show whole numbers
  const valueFormatter = (value: number) => value.toFixed(0);

  return (
    <Card className={cn('border-black-50 max-h-[30rem]', backgroundColor && backgroundColor)}>
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardDescription className="text-gray-400">
            Last {orderedChartData.length} {step}s
          </CardDescription>
        </div>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white text-base lg:text-xl font-medium">
            Questions Answered
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex gap-1 items-center text-sm font-medium leading-none text-white">
              <span className="flex items-center">
                <NumberFlow value={Number(trend.percentage)} />%
              </span>
              {trend.isUp && !trend.isNeutral ? (
                <TrendingUp className="size-4 text-green-500" />
              ) : !trend.isNeutral ? (
                <TrendingDown className="size-4 text-red-500" />
              ) : (
                <Circle className="size-2 fill-yellow-400 text-yellow-500" />
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="border-black-50 p-2 md:p-6">
        {/* Check if there's data to display */}
        {orderedChartData.length > 0 ? (
          <LineChart
            className="max-h-80"
            data={orderedChartData}
            index="date"
            categories={['questions']}
            colors={['cyan']}
            valueFormatter={valueFormatter}
            showXAxis={true}
            showYAxis={true}
            showGridLines={true}
            yAxisWidth={40}
            showLegend={false}
            showTooltip={true}
            customTooltip={(props) => <Tooltip {...props} />}
            tickGap={20}
            connectNulls={true}
            autoMinValue={true}
          />
        ) : (
          <div className="h-80 flex items-center justify-center">
            <p className="text-gray-400">No data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
