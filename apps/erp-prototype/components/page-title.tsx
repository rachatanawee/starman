import { LucideIcon } from 'lucide-react'
import { DynamicTitle } from './dynamic-title'

interface PageTitleProps {
  icon: LucideIcon
  title: string
  subtitle?: string
}

export function PageTitle({ icon: Icon, title, subtitle }: PageTitleProps) {
  return (
    <>
      <DynamicTitle pageTitle={title} />
      <div className="min-w-0 flex-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 text-gray-900">
          <Icon className="h-8 w-8 text-primary flex-shrink-0" />
          <span>{title}</span>
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
    </>
  )
}
