// Forecasting and simulation utilities

export interface ForecastResult {
  period: number
  value: number
  lowerBound?: number
  upperBound?: number
}

export interface SimulationScenario {
  name: string
  investment: number
  expectedROI: number
  timeHorizon: number
  riskLevel: "low" | "medium" | "high"
  assumptions: Record<string, any>
}

export interface SimulationResult {
  scenario: string
  finalValue: number
  totalReturn: number
  roi: number
  yearlyBreakdown: Array<{
    year: number
    value: number
    revenue: number
    costs: number
  }>
}

export function linearForecast(currentValue: number, growthRate: number, periods: number): ForecastResult[] {
  const results: ForecastResult[] = []

  for (let i = 0; i <= periods; i++) {
    results.push({
      period: i,
      value: currentValue * Math.pow(1 + growthRate, i),
    })
  }

  return results
}

export function exponentialForecast(
  currentValue: number,
  growthRate: number,
  periods: number,
  volatility = 0.1,
): ForecastResult[] {
  const results: ForecastResult[] = []

  for (let i = 0; i <= periods; i++) {
    const baseValue = currentValue * Math.pow(1 + growthRate, i)
    const variance = baseValue * volatility

    results.push({
      period: i,
      value: baseValue,
      lowerBound: baseValue - variance,
      upperBound: baseValue + variance,
    })
  }

  return results
}

export function calculateROI(investment: number, returns: number, timeHorizon: number): number {
  return ((returns - investment) / investment) * 100
}

export function calculatePaybackPeriod(investment: number, annualCashFlow: number): number {
  return investment / annualCashFlow
}

export function calculateNPV(investment: number, cashFlows: number[], discountRate: number): number {
  let npv = -investment

  cashFlows.forEach((cashFlow, index) => {
    npv += cashFlow / Math.pow(1 + discountRate, index + 1)
  })

  return npv
}

export function calculateIRR(investment: number, cashFlows: number[]): number {
  // Simplified IRR calculation using Newton's method
  let irr = 0.1 // Initial guess
  const maxIterations = 100
  const tolerance = 0.0001

  for (let i = 0; i < maxIterations; i++) {
    let npv = -investment
    let derivative = 0

    cashFlows.forEach((cashFlow, index) => {
      const period = index + 1
      npv += cashFlow / Math.pow(1 + irr, period)
      derivative -= (period * cashFlow) / Math.pow(1 + irr, period + 1)
    })

    if (Math.abs(npv) < tolerance) break

    irr = irr - npv / derivative
  }

  return irr
}

export function simulateMarketEntry(
  investment: number,
  targetMarketShare: number,
  marketSize: number,
  timeHorizon: number,
  avgRevenuePerCustomer: number,
  cac: number,
): SimulationResult {
  const targetRevenue = marketSize * targetMarketShare
  const targetCustomers = targetRevenue / avgRevenuePerCustomer
  const customersPerYear = targetCustomers / timeHorizon

  const yearlyBreakdown = []
  let cumulativeCustomers = 0
  let cumulativeRevenue = 0
  let cumulativeCosts = investment

  for (let year = 1; year <= timeHorizon; year++) {
    cumulativeCustomers += customersPerYear
    const yearRevenue = cumulativeCustomers * avgRevenuePerCustomer
    const yearCosts = customersPerYear * cac

    cumulativeRevenue += yearRevenue
    cumulativeCosts += yearCosts

    yearlyBreakdown.push({
      year,
      value: cumulativeRevenue - cumulativeCosts,
      revenue: yearRevenue,
      costs: yearCosts,
    })
  }

  const finalValue = cumulativeRevenue
  const totalReturn = finalValue - cumulativeCosts
  const roi = (totalReturn / investment) * 100

  return {
    scenario: "Market Entry",
    finalValue,
    totalReturn,
    roi,
    yearlyBreakdown,
  }
}

export function compareScenarios(scenarios: SimulationScenario[]): Array<SimulationScenario & { score: number }> {
  return scenarios
    .map((scenario) => ({
      ...scenario,
      score: calculateScenarioScore(scenario),
    }))
    .sort((a, b) => b.score - a.score)
}

function calculateScenarioScore(scenario: SimulationScenario): number {
  const roiScore = scenario.expectedROI * 0.4
  const timeScore = (1 / scenario.timeHorizon) * 100 * 0.3
  const riskScore = (scenario.riskLevel === "low" ? 100 : scenario.riskLevel === "medium" ? 60 : 30) * 0.3

  return roiScore + timeScore + riskScore
}
