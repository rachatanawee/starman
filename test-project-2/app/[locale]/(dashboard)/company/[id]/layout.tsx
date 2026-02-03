import { ProjectLayout } from '@/core/layout/project-layout'

export default function CompanyIdLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  return children
}
