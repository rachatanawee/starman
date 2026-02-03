'use client'

import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { ArrowLeft, Edit, Clock, Package, CheckCircle, XCircle, FileText, AlertTriangle, ShieldCheck } from 'lucide-react'
import { mockPurchaseOrders, mockGoodsReceipts, mockVendorBills, type POStatus } from '@/modules/sales/lib/mock-data'

const statusConfig: Record<POStatus, { label: string; color: string; icon: any }> = {
  draft: { label: 'Draft', color: 'bg-gray-500', icon: FileText },
  issued: { label: 'Issued', color: 'bg-blue-500', icon: Clock },
  partially_received: { label: 'Partially Received', color: 'bg-yellow-500', icon: Package },
  received: { label: 'Received', color: 'bg-green-500', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-500', icon: XCircle }
}

export default function PurchaseOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const poId = params.poId as string

  const po = mockPurchaseOrders.find(p => p.id === poId)
  const relatedGRs = mockGoodsReceipts.filter(gr => gr.poId === poId)
  const relatedBills = mockVendorBills.filter(bill => bill.poId === poId)

  if (!po) {
    return (
      
        <div className="p-6">
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Purchase order not found</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push(`/${params.locale}/company/${projectId}/purchasing`)}
            >
              Back to Purchasing
            </Button>
          </div>
        </div>
      
    )
  }

  const StatusIcon = statusConfig[po.status].icon

  return (
    
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{po.poNumber}</h1>
              <p className="text-gray-600 mt-1">{po.vendorName}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className={statusConfig[po.status].color}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig[po.status].label}
            </Badge>
            <Button
              variant="outline"
              onClick={() => router.push(`/${params.locale}/company/${projectId}/purchasing/${po.id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PO Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Vendor</p>
                    <p className="font-medium">{po.vendorName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">PO Date</p>
                    <p className="font-medium">{new Date(po.poDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Delivery Date</p>
                    <p className="font-medium">{new Date(po.deliveryDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="font-medium capitalize">{po.status.replace('_', ' ')}</p>
                  </div>
                </div>
                {po.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-gray-600 text-sm">Notes</p>
                    <p className="text-sm mt-1">{po.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Items ({po.items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">Product</th>
                        <th className="px-3 py-2 text-right">Ordered</th>
                        <th className="px-3 py-2 text-right">Received</th>
                        <th className="px-3 py-2 text-right">Unit Price</th>
                        <th className="px-3 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {po.items.map(item => (
                        <tr key={item.id} className="border-t">
                          <td className="px-3 py-2">
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-xs text-gray-500">{item.productSku}</p>
                          </td>
                          <td className="px-3 py-2 text-right">{item.quantity} {item.uom}</td>
                          <td className="px-3 py-2 text-right">
                            <span className={item.receivedQuantity < item.quantity ? 'text-orange-600' : 'text-green-600'}>
                              {item.receivedQuantity} {item.uom}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-right">฿{item.unitPrice.toLocaleString()}</td>
                          <td className="px-3 py-2 text-right">฿{item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {relatedGRs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Goods Receipts ({relatedGRs.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedGRs.map(gr => (
                      <div key={gr.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{gr.grNumber}</span>
                          <Badge variant="outline">{new Date(gr.receivedDate).toLocaleDateString()}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Received by: {gr.receivedBy}</p>
                        {gr.notes && <p className="text-xs text-gray-500 mt-1">{gr.notes}</p>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {relatedBills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Vendor Bills ({relatedBills.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedBills.map(bill => (
                      <div key={bill.id} className={`border rounded-lg p-3 ${bill.aiWarnings && bill.aiWarnings.length > 0 ? 'border-red-300 bg-red-50' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{bill.billNumber}</span>
                          <Badge variant={bill.status === 'paid' ? 'default' : 'secondary'}>{bill.status}</Badge>
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="text-gray-600">Invoice: {bill.vendorInvoiceNumber}</p>
                          <p className="text-gray-600">Amount: ฿{bill.grandTotal.toLocaleString()}</p>
                          <p className="text-gray-600">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                        </div>
                        {bill.aiWarnings && bill.aiWarnings.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-primary/20 space-y-1">
                            <div className="flex items-center gap-2 text-red-800 font-semibold text-sm">
                              <AlertTriangle className="h-4 w-4" />
                              AI Gatekeeper Alerts
                            </div>
                            {bill.aiWarnings.map((warning, idx) => (
                              <p key={idx} className="text-xs text-red-700">{warning}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub Total</span>
                  <span className="font-medium">฿{po.subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">VAT (7%)</span>
                  <span className="font-medium">฿{po.vatAmount.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t flex justify-between">
                  <span className="font-semibold">Grand Total</span>
                  <span className="text-xl font-bold text-primary">฿{po.grandTotal.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <ShieldCheck className="h-5 w-5" />
                  AI Gatekeeper
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-green-700">
                {relatedBills.some(b => b.aiWarnings && b.aiWarnings.length > 0) ? (
                  <div className="space-y-2">
                    <p className="font-semibold">⚠️ Payment Blocked</p>
                    <p className="text-xs">This PO has billing discrepancies. Review required before payment.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="font-semibold">✓ All Clear</p>
                    <p className="text-xs">3-Way matching passed. Safe to proceed with payment.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    
  )
}
