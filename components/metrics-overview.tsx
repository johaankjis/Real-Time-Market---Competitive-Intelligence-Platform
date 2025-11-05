import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, Target, BarChart3 } from "lucide-react"
import { formatCurrency } from "@/lib/mock-data"

export function MetricsOverview() {
  const metrics = [
    {
      title: "Total TAM",
      value: formatCurrency(77000000000),
      change: "+15.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Serviceable SAM",
      value: formatCurrency(25000000000),
      change: "+18.2%",
      trend: "up",
      icon: Target,
    },
    {
      title: "Target SOM",
      value: formatCurrency(1250000000),
      change: "+22.3%",
      trend: "up",
      icon: BarChart3,
    },
    {
      title: "Competitors Tracked",
      value: "24",
      change: "+4 this month",
      trend: "up",
      icon: Users,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="mt-1 flex items-center text-xs">
                <TrendIcon className={`mr-1 h-3 w-3 ${metric.trend === "up" ? "text-success" : "text-destructive"}`} />
                <span className={metric.trend === "up" ? "text-success" : "text-destructive"}>{metric.change}</span>
                <span className="ml-1 text-muted-foreground">from last quarter</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
