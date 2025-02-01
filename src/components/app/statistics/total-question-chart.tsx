'use client'

import React, { useMemo, useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  BarChartIcon,
  LineChartIcon,
  Circle,
} from 'lucide-react'
import {
  CartesianGrid,
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'
import NumberFlow from '@number-flow/react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const chartConfig = {
  questions: {
    label: 'Questions',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export interface StatsChartData {
  [key: string]: {
    totalQuestions: number
    tagCounts: Record<string, number>
    tags: string[]
  }
}

export default function QuestionChart({
  questionData,
  step,
  backgroundColor,
}: {
  questionData: StatsChartData
  step: 'day' | 'week' | 'month'
  backgroundColor?: string
}) {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar')

  const chartData = useMemo(() => {
    const entries = Object.entries(questionData)

    // Sort entries by date - latest first
    entries.sort((a, b) => {
      const [dateA] = a
      const [dateB] = b
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })

    // Directly use the keys as they should now be pre-formatted
    return entries.map(([date, data]) => ({
      date: date.split(',')[0],
      questions: data.totalQuestions,
    }))
  }, [questionData])

  // order the chart data by the date. Ensuring that the oldest date is first
  const orderedChartData = chartData.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  const trend = useMemo(() => {
    // if there is less than 2 periods, return 0
    if (orderedChartData.length < 2) {
      return { percentage: 0, isNeutral: true }
    }

    // get the first and last period of the chart data
    const firstPeriod = chartData[0]
    const lastPeriod = chartData[chartData.length - 1]

    // Handle case where first period has 0 questions
    if (firstPeriod.questions === 0) {
      if (lastPeriod.questions === 0) {
        return { percentage: 0, isNeutral: true }
      }
      // If starting from 0, treat treat as 0 * lastPeriod.questions increase
      return {
        percentage: 100 * lastPeriod.questions,
        isNeutral: false,
        isUp: true,
      }
    }

    // calculate the percentage change between the first and last period
    const percentageChange =
      ((lastPeriod.questions - firstPeriod.questions) / firstPeriod.questions) *
      100

    return {
      percentage: Math.abs(percentageChange).toFixed(2),
      isNeutral: percentageChange === 0,
      isUp: percentageChange > 0,
    }
  }, [chartData])

  const maxQuestions = useMemo(() => {
    return Math.max(...chartData.map((data) => data.questions))
  }, [chartData])

  const yAxisDomain = useMemo(() => {
    const maxY = Math.ceil(maxQuestions * 1.1)
    return [0, maxY]
  }, [maxQuestions])

  const renderChart = () => {
    const ChartComponent = chartType === 'bar' ? BarChart : LineChart

    return (
      <ChartComponent
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
          top: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.split(',')[0]}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          width={30}
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
          domain={yAxisDomain}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {chartType === 'bar' ? (
          <Bar
            dataKey="questions"
            fill="hsl(var(--accent))"
            radius={[4, 4, 0, 0]}
            className="hover:!bg-transparent"
          />
        ) : (
          <Line
            dataKey="questions"
            type="natural"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            dot={{
              fill: 'hsl(var(--accent))',
            }}
            activeDot={{
              r: 6,
            }}
          />
        )}
      </ChartComponent>
    )
  }

  return (
    <Card
      className={cn(
        'border-black-50 max-h-[28rem]',
        backgroundColor && backgroundColor,
      )}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Questions Answered</CardTitle>
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
            <Select
              value={chartType}
              onValueChange={(value: 'bar' | 'line') => setChartType(value)}
            >
              <SelectTrigger className="border border-black-50 md:w-[180px] text-white bg-primary">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent className="bg-black">
                <SelectItem
                  value="bar"
                  className="hover:cursor-pointer hover:text-white"
                >
                  <div className="flex items-center">
                    <BarChartIcon className="mr-2 size-4" />
                    <span className="hidden md:block">Bar Chart</span>
                  </div>
                </SelectItem>
                <SelectItem
                  value="line"
                  className="hover:cursor-pointer hover:text-white"
                >
                  <div className="flex items-center">
                    <LineChartIcon className="mr-2 size-4" />
                    <span className="hidden md:block">Line Chart</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <CardDescription>
            Last {chartData.length} {step}s
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="border-black-50 max-h-[28rem] p-2 md:p-6">
        <ChartContainer
          config={chartConfig}
          className="max-h-80"
          style={{
            aspectRatio: '16 / 9',
            width: '100%',
          }}
        >
          {renderChart()}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
