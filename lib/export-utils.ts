// Export utilities for various formats

export function exportToCSV(data: any[], filename: string): void {
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) => headers.map((header) => JSON.stringify(row[header] ?? "")).join(",")),
  ].join("\n")

  downloadFile(csvContent, filename, "text/csv")
}

export function exportToJSON(data: any, filename: string): void {
  const jsonContent = JSON.stringify(data, null, 2)
  downloadFile(jsonContent, filename, "application/json")
}

export function exportToPDF(content: string, filename: string): void {
  // In production, use a library like jsPDF or pdfmake
  // This is a placeholder that exports as text
  downloadFile(content, filename.replace(".pdf", ".txt"), "text/plain")
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function formatReportForExport(report: any): string {
  return `
${report.title}
${"=".repeat(report.title.length)}

Generated: ${new Date(report.generatedAt).toLocaleString()}
Period: ${report.period}

EXECUTIVE SUMMARY
${"-".repeat(50)}
${report.summary}

${report.sections
  .map(
    (section: any) => `
${section.title.toUpperCase()}
${"-".repeat(50)}
${section.content}
`,
  )
  .join("\n")}

STRATEGIC RECOMMENDATIONS
${"-".repeat(50)}
${report.recommendations.map((r: string, i: number) => `${i + 1}. ${r}`).join("\n")}

---
End of Report
  `.trim()
}
