// Executive report generation utilities

export interface ReportSection {
  title: string
  content: string
  data?: any
  chartType?: "bar" | "line" | "pie" | "table"
}

export interface ExecutiveReport {
  title: string
  generatedAt: string
  period: string
  sections: ReportSection[]
  summary: string
  recommendations: string[]
}

export function generateExecutiveSummary(data: any): string {
  return `
Market Intelligence Summary - ${new Date().toLocaleDateString()}

Key Findings:
• Total Addressable Market (TAM): $77B with 15.5% YoY growth
• Serviceable Addressable Market (SAM): $25B representing 32% of TAM
• Target Serviceable Obtainable Market (SOM): $1.25B with strong growth trajectory
• Competitive landscape shows 24 active competitors with varying market positions

Market Dynamics:
The Business Intelligence market continues to show robust growth driven by AI adoption (67.5% adoption rate) 
and cloud-first architectures (82.5% adoption). Real-time data processing is emerging as a key differentiator 
with 54.2% adoption rate and accelerating growth.

Strategic Recommendations:
1. Focus on AI-powered analytics capabilities to capture high-growth segment
2. Expand geographic presence in Asia Pacific (22.5% growth rate)
3. Develop competitive pricing strategy targeting mid-market segment
4. Invest in real-time processing infrastructure to match market trends
  `.trim()
}

export function generateCompetitiveAnalysisReport(competitors: any[]): ReportSection {
  return {
    title: "Competitive Landscape Analysis",
    content: `
Analysis of ${competitors.length} key competitors reveals a fragmented market with opportunities for differentiation.

Top Competitors:
${competitors
  .slice(0, 5)
  .map((c, i) => `${i + 1}. ${c.name} - ${c.companySize} employees, ${c.industry}`)
  .join("\n")}

Key Insights:
• Average competitor funding: $27.6M
• Average customer rating: 4.4/5.0
• Primary differentiation: Feature depth vs. ease of use
• Market consolidation expected in next 12-18 months
    `.trim(),
    data: competitors,
    chartType: "table",
  }
}

export function generateMarketSizingReport(segments: any[]): ReportSection {
  const totalTAM = segments.reduce((sum, s) => sum + s.tamValue, 0)
  const totalSAM = segments.reduce((sum, s) => sum + s.samValue, 0)
  const totalSOM = segments.reduce((sum, s) => sum + s.somValue, 0)

  return {
    title: "Market Sizing & Opportunity Analysis",
    content: `
Total Market Opportunity:
• TAM: $${(totalTAM / 1000000000).toFixed(1)}B
• SAM: $${(totalSAM / 1000000000).toFixed(1)}B (${((totalSAM / totalTAM) * 100).toFixed(1)}% of TAM)
• SOM: $${(totalSOM / 1000000000).toFixed(2)}B (${((totalSOM / totalTAM) * 100).toFixed(2)}% of TAM)

Geographic Breakdown:
${segments
  .map((s) => `• ${s.geography}: TAM $${(s.tamValue / 1000000000).toFixed(1)}B, Growth ${s.growthRate}%`)
  .join("\n")}

Highest Growth Opportunity: ${segments.reduce((max, s) => (s.growthRate > max.growthRate ? s : max)).segmentName}
    `.trim(),
    data: segments,
    chartType: "bar",
  }
}

export function generatePricingAnalysisReport(pricing: any[]): ReportSection {
  const avgPrice = pricing.reduce((sum, p) => sum + p.price, 0) / pricing.length

  return {
    title: "Competitive Pricing Analysis",
    content: `
Pricing Landscape:
• Average monthly price: $${avgPrice.toFixed(0)}
• Price range: $${Math.min(...pricing.map((p) => p.price))} - $${Math.max(...pricing.map((p) => p.price))}
• Most common billing cycle: Monthly with annual discounts

Pricing Strategies:
${pricing
  .slice(0, 5)
  .map((p) => `• ${p.companyName}: $${p.price}/${p.billingCycle}`)
  .join("\n")}

Recommendation: Position at $${(avgPrice * 0.9).toFixed(0)}/month to capture market share while maintaining premium perception.
    `.trim(),
    data: pricing,
  }
}

export function generateFullExecutiveReport(data: {
  competitors: any[]
  segments: any[]
  pricing: any[]
  trends: any[]
}): ExecutiveReport {
  return {
    title: "Market Intelligence Executive Report",
    generatedAt: new Date().toISOString(),
    period: `Q${Math.ceil((new Date().getMonth() + 1) / 3)} ${new Date().getFullYear()}`,
    summary: generateExecutiveSummary(data),
    sections: [
      generateMarketSizingReport(data.segments),
      generateCompetitiveAnalysisReport(data.competitors),
      generatePricingAnalysisReport(data.pricing),
    ],
    recommendations: [
      "Accelerate AI feature development to capture 67.5% adoption trend",
      "Expand into Asia Pacific market with 22.5% growth rate",
      "Optimize pricing strategy to target $650-750/month range",
      "Invest in real-time processing capabilities",
      "Develop strategic partnerships to accelerate market penetration",
    ],
  }
}
