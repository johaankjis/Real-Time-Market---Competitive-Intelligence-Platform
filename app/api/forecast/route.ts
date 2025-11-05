import { type NextRequest, NextResponse } from "next/server"
import { linearForecast, exponentialForecast, simulateMarketEntry } from "@/lib/forecasting"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, params } = body

    let result: any

    switch (type) {
      case "linear":
        result = linearForecast(params.currentValue, params.growthRate, params.periods)
        break

      case "exponential":
        result = exponentialForecast(params.currentValue, params.growthRate, params.periods, params.volatility)
        break

      case "market-entry":
        result = simulateMarketEntry(
          params.investment,
          params.targetMarketShare,
          params.marketSize,
          params.timeHorizon,
          params.avgRevenuePerCustomer,
          params.cac,
        )
        break

      default:
        return NextResponse.json({ error: "Invalid forecast type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      type,
      result,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Forecast error:", error)
    return NextResponse.json({ error: "Failed to generate forecast" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Forecasting & Simulation API",
    endpoints: {
      POST: "/api/forecast - Generate forecasts and simulations",
    },
    supportedTypes: ["linear", "exponential", "market-entry"],
  })
}
