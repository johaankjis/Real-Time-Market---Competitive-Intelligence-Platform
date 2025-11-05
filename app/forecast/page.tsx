"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, Calculator, Target } from "lucide-react"

export default function ForecastPage() {
  const [forecastData, setForecastData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [linearParams, setLinearParams] = useState({
    currentValue: 77000000000,
    growthRate: 0.155,
    periods: 5,
  })

  const [marketEntryParams, setMarketEntryParams] = useState({
    investment: 5000000,
    targetMarketShare: 0.05,
    marketSize: 1250000000,
    timeHorizon: 3,
    avgRevenuePerCustomer: 50000,
    cac: 15000,
  })

  const generateForecast = async (type: string, params: any) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, params }),
      })
      const data = await response.json()
      setForecastData(data.result)
    } catch (error) {
      console.error("[v0] Forecast error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Forecasting & Simulation Tools</h2>
          <p className="mt-1 text-muted-foreground">Model market growth and investment scenarios</p>
        </div>

        <Tabs defaultValue="market-growth" className="space-y-6">
          <TabsList>
            <TabsTrigger value="market-growth">
              <TrendingUp className="mr-2 h-4 w-4" />
              Market Growth
            </TabsTrigger>
            <TabsTrigger value="investment">
              <Calculator className="mr-2 h-4 w-4" />
              Investment Simulation
            </TabsTrigger>
            <TabsTrigger value="scenarios">
              <Target className="mr-2 h-4 w-4" />
              Scenario Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="market-growth" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Market Growth Forecast</CardTitle>
                  <CardDescription>Project market size over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentValue" className="text-foreground">
                      Current Market Size ($)
                    </Label>
                    <Input
                      id="currentValue"
                      type="number"
                      value={linearParams.currentValue}
                      onChange={(e) => setLinearParams({ ...linearParams, currentValue: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="growthRate" className="text-foreground">
                      Annual Growth Rate (%)
                    </Label>
                    <Input
                      id="growthRate"
                      type="number"
                      step="0.01"
                      value={linearParams.growthRate * 100}
                      onChange={(e) => setLinearParams({ ...linearParams, growthRate: Number(e.target.value) / 100 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="periods" className="text-foreground">
                      Forecast Periods (Years)
                    </Label>
                    <Input
                      id="periods"
                      type="number"
                      value={linearParams.periods}
                      onChange={(e) => setLinearParams({ ...linearParams, periods: Number(e.target.value) })}
                    />
                  </div>
                  <Button
                    onClick={() => generateForecast("linear", linearParams)}
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground"
                  >
                    {isLoading ? "Generating..." : "Generate Forecast"}
                  </Button>
                </CardContent>
              </Card>

              {forecastData && Array.isArray(forecastData) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-foreground">Forecast Results</CardTitle>
                    <CardDescription>Projected market growth trajectory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={forecastData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis
                          dataKey="period"
                          label={{ value: "Years", position: "insideBottom", offset: -5 }}
                          tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <YAxis
                          tickFormatter={(value) => `$${(value / 1000000000).toFixed(0)}B`}
                          tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <Tooltip
                          formatter={(value: number) => `$${(value / 1000000000).toFixed(2)}B`}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="investment" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Market Entry Simulation</CardTitle>
                  <CardDescription>Model investment returns and customer acquisition</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="investment" className="text-foreground">
                        Investment ($)
                      </Label>
                      <Input
                        id="investment"
                        type="number"
                        value={marketEntryParams.investment}
                        onChange={(e) =>
                          setMarketEntryParams({ ...marketEntryParams, investment: Number(e.target.value) })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marketSize" className="text-foreground">
                        Market Size ($)
                      </Label>
                      <Input
                        id="marketSize"
                        type="number"
                        value={marketEntryParams.marketSize}
                        onChange={(e) =>
                          setMarketEntryParams({ ...marketEntryParams, marketSize: Number(e.target.value) })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetShare" className="text-foreground">
                        Target Market Share (%)
                      </Label>
                      <Input
                        id="targetShare"
                        type="number"
                        step="0.01"
                        value={marketEntryParams.targetMarketShare * 100}
                        onChange={(e) =>
                          setMarketEntryParams({
                            ...marketEntryParams,
                            targetMarketShare: Number(e.target.value) / 100,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeHorizon" className="text-foreground">
                        Time Horizon (Years)
                      </Label>
                      <Input
                        id="timeHorizon"
                        type="number"
                        value={marketEntryParams.timeHorizon}
                        onChange={(e) =>
                          setMarketEntryParams({ ...marketEntryParams, timeHorizon: Number(e.target.value) })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avgRevenue" className="text-foreground">
                        Avg Revenue/Customer ($)
                      </Label>
                      <Input
                        id="avgRevenue"
                        type="number"
                        value={marketEntryParams.avgRevenuePerCustomer}
                        onChange={(e) =>
                          setMarketEntryParams({
                            ...marketEntryParams,
                            avgRevenuePerCustomer: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cac" className="text-foreground">
                        Customer Acquisition Cost ($)
                      </Label>
                      <Input
                        id="cac"
                        type="number"
                        value={marketEntryParams.cac}
                        onChange={(e) => setMarketEntryParams({ ...marketEntryParams, cac: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => generateForecast("market-entry", marketEntryParams)}
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground"
                  >
                    {isLoading ? "Simulating..." : "Run Simulation"}
                  </Button>
                </CardContent>
              </Card>

              {forecastData && forecastData.yearlyBreakdown && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-foreground">Simulation Results</CardTitle>
                    <CardDescription>
                      ROI: {forecastData.roi.toFixed(1)}% | Net Profit: $
                      {(forecastData.totalReturn / 1000000).toFixed(2)}M
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={forecastData.yearlyBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis
                          dataKey="year"
                          label={{ value: "Year", position: "insideBottom", offset: -5 }}
                          tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <YAxis
                          tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                          tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <Tooltip
                          formatter={(value: number) => `$${(value / 1000000).toFixed(2)}M`}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="hsl(var(--success))"
                          strokeWidth={2}
                          name="Revenue"
                        />
                        <Line
                          type="monotone"
                          dataKey="costs"
                          stroke="hsl(var(--destructive))"
                          strokeWidth={2}
                          name="Costs"
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          name="Net Value"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="scenarios">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Scenario Comparison</CardTitle>
                <CardDescription>Compare multiple investment strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Scenario comparison tool coming soon. Use the tabs above to run individual forecasts and simulations.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
