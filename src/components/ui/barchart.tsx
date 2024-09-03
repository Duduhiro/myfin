"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { DataPoint } from "@/lib/types/dashboard"

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

const chartConfig = {
  expense: {
    label: "Expense",
    color: "#7e22ce",
  },
  income: {
    label: "Income",
    color: "#22c55e",
  },
} satisfies ChartConfig

export function BarChartComponent({ data }: { data: DataPoint[] }) {

    console.log(data)
    const title = `${data[0].month} - ${data[data.length - 1].month}`

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
        <CardDescription>{title}</CardDescription>
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
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
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
