"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { mockMarketTrends } from "@/lib/mock-data"

export function TrendAnalysis() {
  const trendData = mockMarketTrends.map((trend) => ({
    name: trend.trendName,
    Q1: trend.dataPoints.q1,
    Q2: trend.dataPoints.q2,
    Q3: trend.dataPoints.q3,
    Q4: trend.dataPoints.q4,
  }))

  // Transform for line chart
  const chartData = ["Q1", "Q2", "Q3", "Q4"].map((quarter) => {
    const dataPoint: any = { quarter }
    mockMarketTrends.forEach((trend) => {
      dataPoint[trend.trendName] = trend.dataPoints[quarter.toLowerCase() as keyof typeof trend.dataPoints]
    })
    return dataPoint
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Market Trends</CardTitle>
        <CardDescription>Adoption rates across key technology trends (%)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="quarter"
              className="text-xs text-muted-foreground"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              className="text-xs text-muted-foreground"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              formatter={(value: number) => `${value}%`}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="AI-Powered Analytics"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
            />
            <Line
              type="monotone"
              dataKey="Real-Time Data Processing"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--accent))" }}
            />
            <Line
              type="monotone"
              dataKey="Cloud-First Architecture"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--success))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
