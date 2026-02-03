import { ProjectLayout } from '@spark/core'

export default async function CompanyIdLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ProjectLayout projectId={id}>{children}</ProjectLayout>
}
