import { LucideIcon } from 'lucide-react'
import { DynamicTitle } from './dynamic-title'
import { ReactNode } from 'react'

interface PageTitleProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  badge?: ReactNode
}

export function PageTitle({ icon: Icon, title, subtitle, badge }: PageTitleProps) {
  return (
    <>
      <DynamicTitle pageTitle={title} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Icon className="h-8 w-8 text-primary flex-shrink-0" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
          {badge}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
    </>
  )
}
