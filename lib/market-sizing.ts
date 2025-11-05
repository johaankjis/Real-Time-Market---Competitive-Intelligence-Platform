// Market sizing calculations and utilities

export interface MarketSegmentData {
  segmentName: string
  industry: string
  geography: string
  customerType: string
  totalCompanies: number
  avgRevenuePerCustomer: number
  marketGrowthRate: number
}

export interface MarketSizingResult {
  tam: number
  sam: number
  som: number
  tamPercentage: number
  samPercentage: number
  somPercentage: number
}

export interface MarketSizingAssumptions {
  penetrationRate: number
  marketShareTarget: number
  competitiveIntensity: number
}

export function calculateTAM(totalCompanies: number, avgRevenuePerCustomer: number): number {
  return totalCompanies * avgRevenuePerCustomer
}

export function calculateSAM(tam: number, penetrationRate: number): number {
  return tam * penetrationRate
}

export function calculateSOM(sam: number, marketShareTarget: number, competitiveIntensity = 0.8): number {
  return sam * marketShareTarget * competitiveIntensity
}

export function calculateFullMarketSizing(
  segment: MarketSegmentData,
  assumptions: MarketSizingAssumptions = {
    penetrationRate: 0.3,
    marketShareTarget: 0.05,
    competitiveIntensity: 0.8,
  },
): MarketSizingResult {
  const tam = calculateTAM(segment.totalCompanies, segment.avgRevenuePerCustomer)
  const sam = calculateSAM(tam, assumptions.penetrationRate)
  const som = calculateSOM(sam, assumptions.marketShareTarget, assumptions.competitiveIntensity)

  return {
    tam,
    sam,
    som,
    tamPercentage: 100,
    samPercentage: (sam / tam) * 100,
    somPercentage: (som / tam) * 100,
  }
}

export function projectMarketGrowth(currentValue: number, growthRate: number, years: number): number[] {
  const projections = [currentValue]

  for (let i = 1; i <= years; i++) {
    const previousValue = projections[i - 1]
    projections.push(previousValue * (1 + growthRate))
  }

  return projections
}

export function calculateCAGR(startValue: number, endValue: number, years: number): number {
  return Math.pow(endValue / startValue, 1 / years) - 1
}

export function calculateMarketShare(companyRevenue: number, totalMarketSize: number): number {
  return (companyRevenue / totalMarketSize) * 100
}

export function estimateCustomerAcquisitionCost(marketingSpend: number, newCustomers: number): number {
  return newCustomers > 0 ? marketingSpend / newCustomers : 0
}

export function calculateLTV(
  avgRevenuePerCustomer: number,
  avgCustomerLifespanYears: number,
  grossMargin = 0.7,
): number {
  return avgRevenuePerCustomer * avgCustomerLifespanYears * grossMargin
}

export function calculateLTVtoCAC(ltv: number, cac: number): number {
  return cac > 0 ? ltv / cac : 0
}
