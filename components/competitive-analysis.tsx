import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { mockCompanies, mockCompetitiveMetrics } from "@/lib/mock-data"
import { Building2 } from "lucide-react"

export function CompetitiveAnalysis() {
  // Group metrics by company
  const companiesWithMetrics = mockCompanies.map((company) => {
    const metrics = mockCompetitiveMetrics.filter((m) => m.companyId === company.id)
    return { ...company, metrics }
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Competitive Intelligence</CardTitle>
            <CardDescription>Real-time competitor tracking and analysis</CardDescription>
          </div>
          <Building2 className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-foreground">Company</TableHead>
              <TableHead className="text-foreground">Industry</TableHead>
              <TableHead className="text-foreground">Size</TableHead>
              <TableHead className="text-foreground">Employees</TableHead>
              <TableHead className="text-foreground">Funding</TableHead>
              <TableHead className="text-foreground">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companiesWithMetrics.map((company) => {
              const employeeMetric = company.metrics.find((m) => m.metricType === "Employee Count")
              const fundingMetric = company.metrics.find((m) => m.metricType === "Total Funding")
              const ratingMetric = company.metrics.find((m) => m.metricType === "Customer Rating")

              return (
                <TableRow key={company.id}>
                  <TableCell className="font-medium text-foreground">
                    <div>
                      <div className="font-semibold">{company.name}</div>
                      <div className="text-xs text-muted-foreground">{company.domain}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{company.industry}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{company.companySize}</Badge>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {employeeMetric ? employeeMetric.metricValue : "N/A"}
                  </TableCell>
                  <TableCell className="text-foreground">{fundingMetric ? fundingMetric.metricValue : "N/A"}</TableCell>
                  <TableCell>
                    {ratingMetric && (
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-foreground">{ratingMetric.metricValue}</span>
                        <span className="text-xs text-muted-foreground">/ 5.0</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
