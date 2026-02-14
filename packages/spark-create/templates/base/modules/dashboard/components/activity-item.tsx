import { ShoppingCart, Factory, Package2, Users } from 'lucide-react'
import { Activity } from '../types'

interface ActivityItemProps {
  activity: Activity
}

const activityStyles = {
  order: {
    bg: 'bg-blue-100',
    icon: ShoppingCart,
    iconColor: 'text-blue-600'
  },
  production: {
    bg: 'bg-green-100',
    icon: Factory,
    iconColor: 'text-green-600'
  },
  inventory: {
    bg: 'bg-purple-100',
    icon: Package2,
    iconColor: 'text-purple-600'
  },
  worker: {
    bg: 'bg-orange-100',
    icon: Users,
    iconColor: 'text-orange-600'
  }
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const style = activityStyles[activity.type]
  const Icon = style.icon

  return (
    <div className="flex items-start gap-3">
      <div className={`${style.bg} p-2 rounded-full`}>
        <Icon className={`h-4 w-4 ${style.iconColor}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{activity.title}</p>
        <p className="text-xs text-gray-600">{activity.description}</p>
        <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
      </div>
    </div>
  )
}
