import { type NextRequest, NextResponse } from "next/server"

// API endpoint for data ingestion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { source, data } = body

    // Validate input
    if (!source || !data) {
      return NextResponse.json({ error: "Missing required fields: source and data" }, { status: 400 })
    }

    // Process data based on source
    let processedData
    switch (source) {
      case "linkedin":
        processedData = await processLinkedInData(data)
        break
      case "crunchbase":
        processedData = await processCrunchbaseData(data)
        break
      case "g2":
        processedData = await processG2Data(data)
        break
      default:
        return NextResponse.json({ error: `Unknown source: ${source}` }, { status: 400 })
    }

    // In production, save to database here
    console.log("[v0] Ingested data:", processedData)

    return NextResponse.json({
      success: true,
      message: `Successfully ingested ${source} data`,
      recordsProcessed: Array.isArray(data) ? data.length : 1,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Ingestion error:", error)
    return NextResponse.json({ error: "Failed to ingest data" }, { status: 500 })
  }
}

async function processLinkedInData(data: any) {
  // Transform LinkedIn data to match database schema
  return {
    source: "linkedin",
    metrics: {
      employeeCount: data.employee_count,
      growthRate: data.growth_rate,
      locations: data.locations,
      specialties: data.specialties,
    },
    confidenceScore: data.confidence_score,
    scrapedAt: data.scraped_at,
  }
}

async function processCrunchbaseData(data: any) {
  // Transform Crunchbase data to match database schema
  return {
    source: "crunchbase",
    financials: {
      totalFunding: data.total_funding,
      lastRound: data.last_funding_round,
      valuation: data.valuation,
      investors: data.investors,
    },
    confidenceScore: data.confidence_score,
    scrapedAt: data.scraped_at,
  }
}

async function processG2Data(data: any) {
  // Transform G2 data to match database schema
  return {
    source: "g2",
    reviews: {
      overallRating: data.overall_rating,
      totalReviews: data.total_reviews,
      sentiment: data.sentiment_analysis,
      featureRatings: data.feature_ratings,
    },
    confidenceScore: data.confidence_score,
    scrapedAt: data.scraped_at,
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Data Ingestion API",
    endpoints: {
      POST: "/api/ingest - Ingest data from various sources",
    },
    supportedSources: ["linkedin", "crunchbase", "g2"],
  })
}
