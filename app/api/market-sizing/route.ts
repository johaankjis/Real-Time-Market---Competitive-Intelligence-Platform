import { type NextRequest, NextResponse } from "next/server"
import {
  calculateFullMarketSizing,
  projectMarketGrowth,
  type MarketSegmentData,
  type MarketSizingAssumptions,
} from "@/lib/market-sizing"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { segment, assumptions } = body

    // Validate input
    if (!segment || !segment.totalCompanies || !segment.avgRevenuePerCustomer) {
      return NextResponse.json({ error: "Missing required segment data" }, { status: 400 })
    }

    // Calculate market sizing
    const sizing = calculateFullMarketSizing(segment as MarketSegmentData, assumptions as MarketSizingAssumptions)

    // Project growth for next 5 years
    const tamProjections = projectMarketGrowth(sizing.tam, segment.marketGrowthRate || 0.15, 5)
    const samProjections = projectMarketGrowth(sizing.sam, segment.marketGrowthRate || 0.15, 5)
    const somProjections = projectMarketGrowth(sizing.som, segment.marketGrowthRate || 0.15, 5)

    return NextResponse.json({
      success: true,
      segment: segment.segmentName,
      currentYear: sizing,
      projections: {
        tam: tamProjections,
        sam: samProjections,
        som: somProjections,
      },
      assumptions: assumptions || {
        penetrationRate: 0.3,
        marketShareTarget: 0.05,
        competitiveIntensity: 0.8,
      },
    })
  } catch (error) {
    console.error("[v0] Market sizing error:", error)
    return NextResponse.json({ error: "Failed to calculate market sizing" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Market Sizing API",
    endpoints: {
      POST: "/api/market-sizing - Calculate TAM/SAM/SOM for a market segment",
    },
    requiredFields: {
      segment: {
        segmentName: "string",
        totalCompanies: "number",
        avgRevenuePerCustomer: "number",
        marketGrowthRate: "number (optional, default 0.15)",
      },
      assumptions: {
        penetrationRate: "number (optional, default 0.3)",
        marketShareTarget: "number (optional, default 0.05)",
        competitiveIntensity: "number (optional, default 0.8)",
      },
    },
  })
}
