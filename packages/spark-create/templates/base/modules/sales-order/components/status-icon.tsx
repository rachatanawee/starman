import { FileText, Clock, CheckCircle, Package, Truck, XCircle } from 'lucide-react'
import { OrderStatus } from '../types'

interface StatusIconProps {
  status: OrderStatus
  className?: string
}

export function StatusIcon({ status, className = "h-4 w-4" }: StatusIconProps) {
  switch (status) {
    case 'Draft':
      return <FileText className={`${className} text-gray-600`} />
    case 'Pending':
      return <Clock className={`${className} text-yellow-600`} />
    case 'Confirmed':
      return <CheckCircle className={`${className} text-blue-600`} />
    case 'Processing':
      return <Package className={`${className} text-blue-600`} />
    case 'Shipped':
      return <Truck className={`${className} text-primary`} />
    case 'Completed':
      return <CheckCircle className={`${className} text-green-600`} />
    case 'Cancelled':
      return <XCircle className={`${className} text-red-600`} />
    default:
      return null
  }
}
