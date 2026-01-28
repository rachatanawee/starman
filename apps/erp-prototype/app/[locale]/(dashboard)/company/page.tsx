'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, GitBranch, Users, DollarSign, Calendar } from 'lucide-react'
import { mockProjectsAPI, type MockProject } from '@/lib/mock-data'
import { toast } from 'sonner'
import { ProjectLayout } from '@/components/project-layout'
import { useTranslations } from 'next-intl'

export default function ProjectsPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('company')
  const tCommon = useTranslations('common')
  const [projects, setProjects] = useState<MockProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await mockProjectsAPI.list()
        setProjects(data)
      } catch {
        toast.error(t('failedToLoad'))
      } finally {
        setIsLoading(false)
      }
    }
    loadProjects()
  }, [])

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0
    }).format(amount)
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loadingProjects')}</p>
        </div>
      </div>
    )
  }

  return (
    <ProjectLayout>
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('companies')}</h1>
              <p className="text-gray-600 mt-1">{t('manageCompanies')}</p>
            </div>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => router.push(`/${locale}/company/new`)}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('newCompany')}
            </Button>
          </div>

          {/* Search */}
          <div className="mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder={t('searchCompanies')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/en/company/${project.id}/dashboard`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <GitBranch className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {project.owner}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{project.members} {t('members')}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {project.aiProvider || 'No AI'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>{t('budget')}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(project.budget)}</span>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{t('created')} {formatDate(project.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Budget Progress */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{t('spent')}</span>
                      <span>{Math.round((project.spent / project.budget) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((project.spent / project.budget) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noCompaniesFound')}</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? t('adjustSearch') : t('getStarted')}
            </p>
            {!searchQuery && (
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => router.push(`/${locale}/company/new`)}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('createCompany')}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
    </ProjectLayout>
  )
}
