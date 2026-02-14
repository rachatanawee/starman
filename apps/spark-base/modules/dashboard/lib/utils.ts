export function exportDashboardCSV(projectName: string, data: any) {
  const csvData = [
    ['Dashboard Report', projectName],
    ['Generated', new Date().toLocaleString()],
    [''],
    ['Inventory Stats'],
    ['Total Items', data.inventory.totalItems],
    ['Low Stock', data.inventory.lowStock],
    ['Out of Stock', data.inventory.outOfStock],
    [''],
    ['Production Stats'],
    ['Active Orders', data.production.activeOrders],
    ['Completed', data.production.completed],
    ['Pending', data.production.pending],
    ['Delayed', data.production.delayed],
  ]
  
  const csv = csvData.map(row => row.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `dashboard-${Date.now()}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

export function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    return true
  } else {
    document.exitFullscreen()
    return false
  }
}
