'use client';

import React, { useMemo, useState } from 'react';
import { TrendingUp, TrendingDown, Circle } from 'lucide-react';
import NumberFlow from '@number-flow/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Tooltip from './tooltip';
import { LineChart } from './line-chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export interface StatsChartData {
  [key: string]: {
    totalQuestions: number;
    tagCounts: Record<string, number>;
    tags: string[];
  };
}

export default function QuestionChart({
  questionData,
  step: initialStep,
  backgroundColor,
}: {
  questionData: StatsChartData;
  step: 'day' | 'week' | 'month';
  backgroundColor?: string;
}) {
  const [step, setStep] = useState<'day' | 'week' | 'month' | 'year'>(initialStep);

  // Get the appropriate number of periods based on selected step
  const getPeriodsToShow = () => {
    switch (step) {
      case 'day':
        return 7;
      case 'week':
        return 30;
      case 'month':
        return 90;
      case 'year':
        return 365;
      default:
        return 7;
    }
  };

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
    // First, sort all data by date (oldest first)
    const allSortedData = [...chartData].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    // Get the number of periods we want to display based on the step
    const periodsToShow = getPeriodsToShow();

    // Return only the most recent periodsToShow items
    return allSortedData.slice(-periodsToShow);
  }, [chartData, step]);

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

  // Get display text for selected period
  const getStepDisplayText = () => {
    switch (step) {
      case 'day':
        return 'Last 7 days';
      case 'week':
        return 'Last 30 days';
      case 'month':
        return 'Last 3 months';
      case 'year':
        return 'Last 12 months';
      default:
        return 'Last 7 days';
    }
  };

  const textSize = 'text-xl font-medium leading-none';

  return (
    <Card className={cn('border-black-50 max-h-[30rem]', backgroundColor && backgroundColor)}>
      <CardHeader className="pb-0 flex flex-row w-full justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <CardDescription className="text-gray-400">{getStepDisplayText()}</CardDescription>
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-white text-base lg:text-xl font-medium">
              Questions Answered
            </CardTitle>
          </div>
        </div>
        {/** step changer */}
        <div className="flex items-center gap-2">
          <Select
            value={step}
            onValueChange={(value) => setStep(value as 'day' | 'week' | 'month' | 'year')}
          >
            <SelectTrigger className="border border-black-50 text-white flex items-center gap-2 group duration-200">
              <SelectValue placeholder="Select a period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 7 days</SelectItem>
              <SelectItem value="week">Last 30 days</SelectItem>
              <SelectItem value="month">Last 3 months</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="border-black-50 p-2 md:p-6 md:px-0">
        {/* Check if there's data to display */}
        {orderedChartData.length > 0 ? (
          <LineChart
            className="max-h-80"
            data={orderedChartData}
            index="date"
            categories={['questions']}
            colors={['cyan']}
            valueFormatter={valueFormatter}
            showXAxis={false}
            showYAxis={false}
            showGridLines={false}
            yAxisWidth={40}
            showLegend={false}
            showTooltip
            customTooltip={(props) => <Tooltip {...props} />}
            tickGap={20}
            connectNulls
            autoMinValue
          />
        ) : (
          <div className="h-80 flex items-center justify-center">
            <p className="text-gray-400">No data available</p>
          </div>
        )}
        <div className="flex flex-col gap-2 pb-6 px-6">
          <div className="flex items-center gap-1 justify-between">
            <p className={cn(textSize, 'text-white font-onest')}>
              {orderedChartData[orderedChartData.length - 1]?.questions || 0} questions answered
            </p>
            <div className="flex items-center gap-1">
              <div
                className={cn(
                  'flex gap-1 items-center',
                  trend.isUp ? 'text-green-500' : 'text-red-500',
                  textSize
                )}
              >
                {trend.isUp ? '+' : '-'}
                <span className="flex items-center font-onest">
                  (<NumberFlow value={Number(trend.percentage)} />
                  %)
                </span>
              </div>
              <p className={cn(textSize, 'text-gray-400')}>vs last month</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
