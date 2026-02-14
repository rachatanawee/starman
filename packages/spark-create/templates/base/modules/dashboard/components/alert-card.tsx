import { AlertCircle, Clock, CheckCircle2, Info } from 'lucide-react'
import { Alert } from '../types'

interface AlertCardProps {
  alert: Alert
}

const alertStyles = {
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: AlertCircle,
    iconColor: 'text-red-600',
    titleColor: 'text-red-900',
    messageColor: 'text-red-700',
    timeColor: 'text-red-600'
  },
  warning: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: Clock,
    iconColor: 'text-orange-600',
    titleColor: 'text-orange-900',
    messageColor: 'text-orange-700',
    timeColor: 'text-orange-600'
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: CheckCircle2,
    iconColor: 'text-green-600',
    titleColor: 'text-green-900',
    messageColor: 'text-green-700',
    timeColor: 'text-green-600'
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: Info,
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
    messageColor: 'text-blue-700',
    timeColor: 'text-blue-600'
  }
}

export function AlertCard({ alert }: AlertCardProps) {
  const style = alertStyles[alert.type]
  const Icon = style.icon

  return (
    <div className={`flex items-start gap-3 p-3 ${style.bg} rounded-lg border ${style.border}`}>
      <Icon className={`h-5 w-5 ${style.iconColor} mt-0.5`} />
      <div className="flex-1">
        <p className={`text-sm font-medium ${style.titleColor}`}>{alert.title}</p>
        <p className={`text-xs ${style.messageColor}`}>{alert.message}</p>
        <p className={`text-xs ${style.timeColor} mt-1`}>{alert.timestamp}</p>
      </div>
    </div>
  )
}
