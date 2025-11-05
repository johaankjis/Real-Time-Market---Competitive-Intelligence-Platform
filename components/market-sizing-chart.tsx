"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { mockMarketSegments } from "@/lib/mock-data"

export function MarketSizingChart() {
  const data = mockMarketSegments.map((segment) => ({
    name: segment.geography,
    TAM: segment.tamValue / 1000000000,
    SAM: segment.samValue / 1000000000,
    SOM: segment.somValue / 1000000000,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Market Sizing Analysis</CardTitle>
        <CardDescription>TAM/SAM/SOM breakdown by geography (in billions)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="name"
              className="text-xs text-muted-foreground"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              className="text-xs text-muted-foreground"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => `$${value}B`}
            />
            <Tooltip
              formatter={(value: number) => `$${value.toFixed(1)}B`}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Bar dataKey="TAM" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="SAM" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="SOM" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
