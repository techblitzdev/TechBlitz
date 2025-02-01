"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { UserRoadmapsWithAnswers } from "@/types/Roadmap";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Component(opts: { roadmap: UserRoadmapsWithAnswers }) {
  const { roadmap } = opts;

  const correctCount = roadmap.questions.filter((f) => f.userCorrect).length;
  const incorrectCount = roadmap.questions.filter((f) => !f.userCorrect).length;
  const correctPercentage = Math.round(
    (correctCount / roadmap.questions.length) * 100,
  );

  const chartData = [
    {
      correct: correctCount,
      incorrect: incorrectCount,
    },
  ];

  return (
    <Card className="flex flex-col border border-black-50 bg-black-75">
      <CardHeader className="items-center pb-0 pt-4 px-3 text-white font-ubuntu">
        Roadmap Stats
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 px-3 max-h-[150px] pt-16">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              labelClassName="fill-white"
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-white text-2xl font-bold"
                        >
                          {correctPercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-white"
                        >
                          Correct
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="correct"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-mobile)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="incorrect"
              fill="var(--color-desktop)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-xs flex text-center items-center gap-2 font-medium leading-none text-white">
          You have answered {correctCount} out of {roadmap.questions.length}{" "}
          questions correctly
        </div>
      </CardFooter>
    </Card>
  );
}
