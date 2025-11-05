import { Button } from "@/components/ui/button"
import { RefreshCw, Settings } from "lucide-react"
import { ExportDialog } from "@/components/export-dialog"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground text-balance">Market Intelligence Platform</h1>
            <p className="mt-1 text-muted-foreground">Real-time competitive analysis and market insights</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
            <ExportDialog />
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
