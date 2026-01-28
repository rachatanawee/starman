import { ReactNode } from 'react'

interface ResponsivePageWrapperProps {
  children: ReactNode
}

export function ResponsivePageWrapper({ children }: ResponsivePageWrapperProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[320px]">
        {children}
      </div>
    </div>
  )
}
