// Data ingestion utilities and helpers

export interface IngestionResult {
  success: boolean
  recordsProcessed: number
  errors: string[]
  timestamp: string
}

export interface DataSource {
  name: string
  type: "api" | "scraper" | "manual"
  lastSync?: string
  status: "active" | "inactive" | "error"
}

export const dataSources: DataSource[] = [
  { name: "LinkedIn", type: "scraper", status: "active" },
  { name: "Crunchbase", type: "api", status: "active" },
  { name: "G2", type: "scraper", status: "active" },
  { name: "Company Website", type: "scraper", status: "active" },
  { name: "Manual Entry", type: "manual", status: "active" },
]

export async function ingestData(source: string, data: any): Promise<IngestionResult> {
  try {
    const response = await fetch("/api/ingest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ source, data }),
    })

    if (!response.ok) {
      throw new Error(`Ingestion failed: ${response.statusText}`)
    }

    const result = await response.json()
    return {
      success: true,
      recordsProcessed: result.recordsProcessed,
      errors: [],
      timestamp: result.timestamp,
    }
  } catch (error) {
    return {
      success: false,
      recordsProcessed: 0,
      errors: [error instanceof Error ? error.message : "Unknown error"],
      timestamp: new Date().toISOString(),
    }
  }
}

export function validateCompanyData(data: any): boolean {
  const requiredFields = ["name", "domain", "industry"]
  return requiredFields.every((field) => field in data && data[field])
}

export function validateMetricData(data: any): boolean {
  const requiredFields = ["companyId", "metricType", "metricValue"]
  return requiredFields.every((field) => field in data && data[field])
}

export function calculateConfidenceScore(dataSource: string, dataAge: number): number {
  // Calculate confidence based on source reliability and data freshness
  const sourceScores: Record<string, number> = {
    linkedin: 0.95,
    crunchbase: 0.9,
    g2: 0.98,
    manual: 0.85,
  }

  const baseScore = sourceScores[dataSource.toLowerCase()] || 0.7

  // Reduce confidence for older data (decay over 30 days)
  const agePenalty = Math.min(dataAge / 30, 0.3)

  return Math.max(baseScore - agePenalty, 0.5)
}
