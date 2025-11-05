import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockPricingTiers } from "@/lib/mock-data"
import { DollarSign, Check } from "lucide-react"

export function PricingComparison() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Competitive Pricing Analysis</CardTitle>
            <CardDescription>Compare pricing strategies across competitors</CardDescription>
          </div>
          <DollarSign className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockPricingTiers.map((tier) => (
            <div
              key={tier.id}
              className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4">
                <div className="text-sm font-medium text-muted-foreground">{tier.companyName}</div>
                <div className="mt-1 text-xl font-bold text-foreground">{tier.productName}</div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">${tier.price}</span>
                  <span className="text-muted-foreground">/{tier.billingCycle}</span>
                </div>
                <Badge variant="secondary" className="mt-2">
                  {tier.tierName}
                </Badge>
              </div>

              <div className="space-y-2">
                {Object.entries(tier.features).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                    <span className="text-foreground">
                      <span className="font-medium capitalize">{key.replace(/_/g, " ")}:</span>{" "}
                      {typeof value === "boolean" ? "Included" : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
