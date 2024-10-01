"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { expense: "expense", total: 1260, fill: "#9333ea" },
]

const chartConfig = {
  limit: {
    label: "Limit",
  },
  expense: {
    label: "expense",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ExpedingLimitChartComponent({ limit, expent }: { limit: {limit_amount: number}[], expent: { expense: string, total: number, fill: string}[]}) {
  
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    let degrees = 0

    if (limit[0].limit_amount == 0) {
        degrees = 0;
    } else {
        degrees = 360 / limit[0].limit_amount;
    }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Expending Limit</CardTitle>
        <CardDescription>{months[month]} {year}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto"
        >
          <RadialBarChart
            data={expent}
            endAngle={degrees}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-gray-200 last:fill-white"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="total" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${expent[0].total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          expent
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground text-md">
          This month&apos;s limit: ${limit[0].limit_amount}
        </div>
      </CardFooter>
    </Card>
  )
}