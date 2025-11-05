// Mock data generators for development and demonstration

export interface Company {
  id: number
  name: string
  domain: string
  industry: string
  companySize: string
  headquarters: string
  foundedYear: number
  isCompetitor: boolean
}

export interface CompetitiveMetric {
  id: number
  companyId: number
  companyName: string
  dataSource: string
  metricType: string
  metricValue: string
  confidenceScore: number
  scrapedAt: string
}

export interface MarketSegment {
  id: number
  segmentName: string
  industry: string
  geography: string
  customerType: string
  tamValue: number
  samValue: number
  somValue: number
  growthRate: number
  year: number
}

export interface PricingTier {
  id: number
  companyName: string
  productName: string
  tierName: string
  price: number
  billingCycle: string
  features: Record<string, any>
}

export interface MarketTrend {
  id: number
  trendName: string
  category: string
  description: string
  impactScore: number
  adoptionRate: number
  timePeriod: string
  dataPoints: Record<string, number>
}

export const mockCompanies: Company[] = [
  {
    id: 1,
    name: "TechVision Analytics",
    domain: "techvision.com",
    industry: "Business Intelligence",
    companySize: "500-1000",
    headquarters: "San Francisco, CA",
    foundedYear: 2018,
    isCompetitor: true,
  },
  {
    id: 2,
    name: "DataStream Pro",
    domain: "datastream.io",
    industry: "Business Intelligence",
    companySize: "100-500",
    headquarters: "New York, NY",
    foundedYear: 2019,
    isCompetitor: true,
  },
  {
    id: 3,
    name: "InsightHub",
    domain: "insighthub.com",
    industry: "Business Intelligence",
    companySize: "50-100",
    headquarters: "Austin, TX",
    foundedYear: 2020,
    isCompetitor: true,
  },
  {
    id: 4,
    name: "MarketPulse",
    domain: "marketpulse.com",
    industry: "Market Research",
    companySize: "200-500",
    headquarters: "Boston, MA",
    foundedYear: 2017,
    isCompetitor: true,
  },
  {
    id: 5,
    name: "CompeteIQ",
    domain: "competeiq.com",
    industry: "Competitive Intelligence",
    companySize: "100-200",
    headquarters: "Seattle, WA",
    foundedYear: 2019,
    isCompetitor: true,
  },
]

export const mockCompetitiveMetrics: CompetitiveMetric[] = [
  {
    id: 1,
    companyId: 1,
    companyName: "TechVision Analytics",
    dataSource: "LinkedIn",
    metricType: "Employee Count",
    metricValue: "750",
    confidenceScore: 0.95,
    scrapedAt: "2024-03-15T10:00:00Z",
  },
  {
    id: 2,
    companyId: 1,
    companyName: "TechVision Analytics",
    dataSource: "Crunchbase",
    metricType: "Total Funding",
    metricValue: "$45M",
    confidenceScore: 0.9,
    scrapedAt: "2024-03-15T10:00:00Z",
  },
  {
    id: 3,
    companyId: 1,
    companyName: "TechVision Analytics",
    dataSource: "G2",
    metricType: "Customer Rating",
    metricValue: "4.5",
    confidenceScore: 0.98,
    scrapedAt: "2024-03-15T10:00:00Z",
  },
  {
    id: 4,
    companyId: 2,
    companyName: "DataStream Pro",
    dataSource: "LinkedIn",
    metricType: "Employee Count",
    metricValue: "320",
    confidenceScore: 0.95,
    scrapedAt: "2024-03-15T10:00:00Z",
  },
  {
    id: 5,
    companyId: 2,
    companyName: "DataStream Pro",
    dataSource: "Crunchbase",
    metricType: "Total Funding",
    metricValue: "$28M",
    confidenceScore: 0.9,
    scrapedAt: "2024-03-15T10:00:00Z",
  },
  {
    id: 6,
    companyId: 3,
    companyName: "InsightHub",
    dataSource: "G2",
    metricType: "Customer Rating",
    metricValue: "4.6",
    confidenceScore: 0.98,
    scrapedAt: "2024-03-15T10:00:00Z",
  },
]

export const mockMarketSegments: MarketSegment[] = [
  {
    id: 1,
    segmentName: "Enterprise BI - North America",
    industry: "Business Intelligence",
    geography: "North America",
    customerType: "Enterprise",
    tamValue: 25000000000,
    samValue: 8000000000,
    somValue: 400000000,
    growthRate: 15.5,
    year: 2024,
  },
  {
    id: 2,
    segmentName: "SMB Analytics - North America",
    industry: "Business Intelligence",
    geography: "North America",
    customerType: "SMB",
    tamValue: 12000000000,
    samValue: 4000000000,
    somValue: 200000000,
    growthRate: 18.2,
    year: 2024,
  },
  {
    id: 3,
    segmentName: "Enterprise BI - Europe",
    industry: "Business Intelligence",
    geography: "Europe",
    customerType: "Enterprise",
    tamValue: 18000000000,
    samValue: 6000000000,
    somValue: 300000000,
    growthRate: 14.8,
    year: 2024,
  },
  {
    id: 4,
    segmentName: "Enterprise BI - Asia Pacific",
    industry: "Business Intelligence",
    geography: "Asia Pacific",
    customerType: "Enterprise",
    tamValue: 22000000000,
    samValue: 7000000000,
    somValue: 350000000,
    growthRate: 22.5,
    year: 2024,
  },
]

export const mockPricingTiers: PricingTier[] = [
  {
    id: 1,
    companyName: "TechVision Analytics",
    productName: "Enterprise",
    tierName: "Monthly",
    price: 999,
    billingCycle: "monthly",
    features: { users: "unlimited", support: "24/7", sla: "99.9%" },
  },
  {
    id: 2,
    companyName: "TechVision Analytics",
    productName: "Starter",
    tierName: "Monthly",
    price: 299,
    billingCycle: "monthly",
    features: { users: 10, support: "email", dashboards: 5 },
  },
  {
    id: 3,
    companyName: "DataStream Pro",
    productName: "Professional",
    tierName: "Monthly",
    price: 799,
    billingCycle: "monthly",
    features: { users: 50, integrations: 50, support: "priority" },
  },
  {
    id: 4,
    companyName: "InsightHub",
    productName: "Pro",
    tierName: "Monthly",
    price: 599,
    billingCycle: "monthly",
    features: { users: 25, reports: "unlimited", api: true },
  },
  {
    id: 5,
    companyName: "MarketPulse",
    productName: "Research Pro",
    tierName: "Monthly",
    price: 899,
    billingCycle: "monthly",
    features: { surveys: 100, responses: 10000, analysis: true },
  },
]

export const mockMarketTrends: MarketTrend[] = [
  {
    id: 1,
    trendName: "AI-Powered Analytics",
    category: "Technology",
    description: "Integration of AI and ML in business intelligence",
    impactScore: 0.95,
    adoptionRate: 67.5,
    timePeriod: "2024-Q1",
    dataPoints: { q1: 62, q2: 67.5, q3: 73, q4: 78 },
  },
  {
    id: 2,
    trendName: "Real-Time Data Processing",
    category: "Technology",
    description: "Shift towards real-time analytics",
    impactScore: 0.88,
    adoptionRate: 54.2,
    timePeriod: "2024-Q1",
    dataPoints: { q1: 48, q2: 54.2, q3: 60, q4: 65 },
  },
  {
    id: 3,
    trendName: "Self-Service BI",
    category: "Business Model",
    description: "Democratization of data analytics",
    impactScore: 0.82,
    adoptionRate: 71.3,
    timePeriod: "2024-Q1",
    dataPoints: { q1: 68, q2: 71.3, q3: 74, q4: 77 },
  },
  {
    id: 4,
    trendName: "Cloud-First Architecture",
    category: "Technology",
    description: "Migration to cloud-based solutions",
    impactScore: 0.91,
    adoptionRate: 82.5,
    timePeriod: "2024-Q1",
    dataPoints: { q1: 78, q2: 82.5, q3: 86, q4: 89 },
  },
]

export function formatCurrency(value: number): string {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`
  }
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`
  }
  return `$${value.toFixed(0)}`
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}
