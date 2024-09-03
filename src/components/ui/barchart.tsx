"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  { month: "January", expense: 186, income: 80 },
  { month: "February", expense: 305, income: 200 },
  { month: "March", expense: 237, income: 120 },
  { month: "April", expense: 73, income: 190 },
  { month: "May", expense: 209, income: 130 },
  { month: "June", expense: 214, income: 140 },
]

const chartConfig = {
  desktop: {
    label: "Expense",
    color: "#7e22ce",
  },
  mobile: {
    label: "Income",
    color: "#22c55e",
  },
} satisfies ChartConfig

export function BarChartComponent() {

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
        <div className="flex gap-5">
            <div className="flex items-center gap-2">
                <div className="bg-purple-700 w-7 h-3 rounded-md"></div>
                <p>Expenses</p>
            </div>
            <div className="flex items-center gap-2">
                <div className="bg-green-500 w-7 h-3 rounded-md"></div>
                <p>Income</p>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="expense" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="income" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing income and expenses from the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
