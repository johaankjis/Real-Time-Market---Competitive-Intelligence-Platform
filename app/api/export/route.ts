import { type NextRequest, NextResponse } from "next/server"
import { mockCompanies, mockMarketSegments, mockPricingTiers, mockMarketTrends } from "@/lib/mock-data"
import { generateFullExecutiveReport } from "@/lib/report-generator"
import { formatReportForExport } from "@/lib/export-utils"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const format = searchParams.get("format") || "json"
  const type = searchParams.get("type") || "full"

  try {
    let data: any

    switch (type) {
      case "full":
        data = generateFullExecutiveReport({
          competitors: mockCompanies,
          segments: mockMarketSegments,
          pricing: mockPricingTiers,
          trends: mockMarketTrends,
        })
        break
      case "competitors":
        data = mockCompanies
        break
      case "market-sizing":
        data = mockMarketSegments
        break
      case "pricing":
        data = mockPricingTiers
        break
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    }

    // Format based on requested format
    if (format === "text") {
      const textContent = formatReportForExport(data)
      return new NextResponse(textContent, {
        headers: {
          "Content-Type": "text/plain",
          "Content-Disposition": `attachment; filename="market-intelligence-report.txt"`,
        },
      })
    }

    if (format === "csv" && Array.isArray(data)) {
      const headers = Object.keys(data[0] || {})
      const csvContent = [
        headers.join(","),
        ...data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")),
      ].join("\n")

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="market-intelligence-data.csv"`,
        },
      })
    }

    // Default to JSON
    return NextResponse.json(data, {
      headers: {
        "Content-Disposition": `attachment; filename="market-intelligence-report.json"`,
      },
    })
  } catch (error) {
    console.error("[v0] Export error:", error)
    return NextResponse.json({ error: "Failed to generate export" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reportType, customData } = body

    // Generate custom report with provided data
    const report = generateFullExecutiveReport(
      customData || {
        competitors: mockCompanies,
        segments: mockMarketSegments,
        pricing: mockPricingTiers,
        trends: mockMarketTrends,
      },
    )

    return NextResponse.json({
      success: true,
      report,
      downloadUrl: `/api/export?format=text&type=${reportType}`,
    })
  } catch (error) {
    console.error("[v0] Report generation error:", error)
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 })
  }
}
