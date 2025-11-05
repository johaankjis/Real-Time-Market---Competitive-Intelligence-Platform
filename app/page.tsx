import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsOverview } from "@/components/metrics-overview"
import { CompetitiveAnalysis } from "@/components/competitive-analysis"
import { MarketSizingChart } from "@/components/market-sizing-chart"
import { TrendAnalysis } from "@/components/trend-analysis"
import { PricingComparison } from "@/components/pricing-comparison"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <MetricsOverview />
        </Suspense>

        <div className="grid gap-8 lg:grid-cols-2">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <MarketSizingChart />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <TrendAnalysis />
          </Suspense>
        </div>

        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <CompetitiveAnalysis />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <PricingComparison />
        </Suspense>
      </main>
    </div>
  )
}
