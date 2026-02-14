import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  borderColor: string
  subtitleColor?: string
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  iconBgColor,
  borderColor,
  subtitleColor = 'text-gray-600'
}: StatCardProps) {
  return (
    <Card className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 ${borderColor}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`${iconBgColor} p-2 rounded-lg`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {subtitle && (
          <p className={`text-xs mt-1 font-medium ${subtitleColor}`}>{subtitle}</p>
        )}
      </CardContent>
    </Card>
  )
}
