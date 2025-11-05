"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Download, FileText, FileJson, FileSpreadsheet } from "lucide-react"

export function ExportDialog() {
  const [format, setFormat] = useState("json")
  const [type, setType] = useState("full")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const response = await fetch(`/api/export?format=${format}&type=${type}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `market-intelligence-${type}.${format === "csv" ? "csv" : format === "text" ? "txt" : "json"}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("[v0] Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Export Report</DialogTitle>
          <DialogDescription>Choose the format and data to export</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-foreground">Report Type</Label>
            <RadioGroup value={type} onValueChange={setType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="full" />
                <Label htmlFor="full" className="font-normal text-foreground">
                  Full Executive Report
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="competitors" id="competitors" />
                <Label htmlFor="competitors" className="font-normal text-foreground">
                  Competitive Analysis Only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="market-sizing" id="market-sizing" />
                <Label htmlFor="market-sizing" className="font-normal text-foreground">
                  Market Sizing Data
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pricing" id="pricing" />
                <Label htmlFor="pricing" className="font-normal text-foreground">
                  Pricing Analysis
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-foreground">Export Format</Label>
            <RadioGroup value={format} onValueChange={setFormat}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="flex items-center gap-2 font-normal text-foreground">
                  <FileJson className="h-4 w-4" />
                  JSON (Structured Data)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center gap-2 font-normal text-foreground">
                  <FileSpreadsheet className="h-4 w-4" />
                  CSV (Spreadsheet)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text" className="flex items-center gap-2 font-normal text-foreground">
                  <FileText className="h-4 w-4" />
                  Text Report
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={handleExport} disabled={isExporting} className="bg-primary text-primary-foreground">
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
