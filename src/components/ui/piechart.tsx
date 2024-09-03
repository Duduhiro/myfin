"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { expense: "Transport", value: 275, fill: "#fdba74" },
  { expense: "Food", value: 200, fill: "#86efac" },
  { expense: "Entertainment", value: 100, fill: "#93c5fd" },
  { expense: "Movie", value: 120, fill: "#23f3ad" },
  { expense: "Rentals", value: 50, fill: "#4225dd" },
]

const chartConfig = {
    visitors: {
        label: "Expent",
    },
    transport: {
        label: "Transport",
        color: "hsl(var(--chart-1))",
    },
    food: {
        label: "Food",
        color: "hsl(var(--chart-2))",
    },
    entertainment: {
        label: "Entertainment",
        color: "hsl(var(--chart-3))",
    }
} satisfies ChartConfig

export function PieChartComponent({ data }: { data: { category: string, amount: number, fill:string }[]}) {
  const totalVisitors = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.amount, 0)
  }, [data])

    const date = new Date();
    const month = date.getMonth() - 1;
    const year = date.getFullYear();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses</CardTitle>
        <CardDescription>{months[month]} {year}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
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
                        >$
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Spent
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing your expense breakdown from last month
        </div>
      </CardFooter>
    </Card>
  )
}
